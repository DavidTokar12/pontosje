import re
import fitz
import re
import csv
from pysbd import Segmenter
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize

from algorithm.common.common import SZOFAJOK, LARGE_HUN_ALPHABET, NUMERICAL_CHARS


START_PAGE = 17
END_PAGE = 899
INPUT = "/home/etokdav/pontosje/pontosje/pontosje-algorithm/algorithm/datasets/data_preperation/input/TAMOP-4_2_5-09_Magyar_ertelmezo_szotar_diakoknak.pdf"


def clean_other_text(text):

    # Remove serial numbers (integer followed by a dot)
    text = re.sub(r"\b\d+\.\s*", "", text)

    # Replace standalone "I " with "*"
    text = re.sub(r"\bI\s\b", "*", text)

    # Replace newlines with a space
    text = text.replace("\n", " ")

    # Replace multiple spaces with a single space
    text = re.sub(r"\s+", " ", text)

    # Strip leading and trailing whitespace
    text = text.strip()
    return text


def extract_word_endings(text):
    # Define the pattern to match endings with * or ~ followed by lowercase Hungarian alphabet characters
    splitted = word_tokenize(text, language="finnish")

    return None


def extract_sentences_and_remainder(text):
    all_sentences = sent_tokenize(text, language="finnish")

    other_text_and_definition = all_sentences[0]

    split_index = -1
    for current_index, char in enumerate(other_text_and_definition):
        if char in LARGE_HUN_ALPHABET or char in NUMERICAL_CHARS or char == "(":
            split_index = current_index
            break

    other_text = other_text_and_definition[:split_index].strip()
    definition = other_text_and_definition[split_index:].strip()

    return other_text, definition, all_sentences[1:]


def process_other_text(text):
    splitted = word_tokenize(text, language="finnish")

    # filter commas
    filtered_list = [char for char in splitted if char != ',']

    # join * and word after it, as for some reason they are seperated
    cleaned_list = []
    i = 0
    while i < len(filtered_list):
        if filtered_list[i] == '*':
            if i + 1 < len(filtered_list):
                cleaned_list.append('*' + filtered_list[i + 1])
                i += 2
            else:
                cleaned_list.append('*')
                i += 1
        else:
            cleaned_list.append(filtered_list[i])
            i += 1

    word_types = []
    word_endings = []

    for item in cleaned_list:
        if item in SZOFAJOK:
            word_types.append(item)
        elif item[0] in "*~" and len(item) > 1 or item == "vagy":
            word_endings.append(item)

    return word_types, word_endings


def process_and_classify_pdf(input_path, start_page, end_page):

    document = fitz.open(input_path)
    all_text_with_details = []

    for page_number in range(start_page, end_page):

        page = document.load_page(page_number - 1)

        text_instances = page.get_text("dict")

        for block in text_instances["blocks"]:
            block_text = ""
            if "lines" in block:
                for line in block["lines"]:
                    for span in line["spans"]:

                        # just a newline character
                        if len(span["text"].strip()) == 0:
                            continue

                        if span["size"] != 9.0 and span["text"].strip() != "|":
                            continue

                        # flag 0 is for the star signs
                        # flag 16 is for the word itself
                        if span["flags"] == 16:
                            all_text_with_details.append(
                                ("word", span["text"].strip()))
                        elif span["flags"] == 0:
                            all_text_with_details.append(
                                ("stars", span["text"].strip()))
                        elif span["text"].strip() == "|":
                            all_text_with_details.append(
                                ("separator", span["text"].strip()))
                        else:
                            all_text_with_details.append(
                                ("other", span["text"]))

    return all_text_with_details


def partition_into_words(ordered_classifications):

    partition_indexes = []

    i = 0
    while i < len(ordered_classifications) - 3:
        (current_classification, text1) = ordered_classifications[i]
        (next_classification, text2) = ordered_classifications[i + 1]
        (next_next_classification, text3) = ordered_classifications[i + 2]
        (next_next_next_classification, text4) = ordered_classifications[i + 3]

        if current_classification == "word" and next_classification == "stars":
            partition_indexes.append(i)
            i += 2  # Skip the next classification to avoid overlap
            continue

        if current_classification == "word" and next_classification == "word" and next_next_classification == "stars":
            partition_indexes.append(i)
            i += 3  # Skip the next classification to avoid overlap
            continue

        if current_classification == "word" and next_classification == "word" and next_next_classification == "word" and next_next_next_classification == "stars":
            partition_indexes.append(i)
            i += 4  # Skip the next classification to avoid overlap
            continue

        if (
            current_classification == "word"
            and next_classification == "separator"
            and next_next_classification == "word"
            and next_next_next_classification == "stars"
        ):
            partition_indexes.append(i)
            i += 4  # Skip the next three classifications to avoid overlap
            continue

        i += 1

    partitions = []

    for i in range(len(partition_indexes)):

        start_index = partition_indexes[i]

        if i + 1 < len(partition_indexes):
            end_index = partition_indexes[i + 1]
        else:
            end_index = len(ordered_classifications)

        partitions.append(ordered_classifications[start_index:end_index])

    return partitions


def handle_single_word(word_items):

    word = word_items[0][1]

    splitted_word = word.split()
    if len(splitted_word) > 1:
        word = splitted_word[0]

    frequency_classification = word_items[1][1].count("\uf077")

    other_string = ""
    for item in word_items[2:]:
        other_string += " " + item[1]

    other_string = clean_other_text(other_string)

    other_text, definition, sentences = extract_sentences_and_remainder(
        other_string)

    word_types, word_endings = process_other_text(other_text)

    return word, frequency_classification, definition, word_types, word_endings, sentences


def extract_word_freqiency_and_other(word_partitions):
    all_words_with_frequency_and_other = []

    with open("hun_szotar_data.csv", "w", newline="\n") as szotar_file:

        szotar_writer = csv.writer(szotar_file)
        szotar_writer.writerow(
            ['word', 'frequency_classification', 'definition', 'word_types', 'word_endings', 'sentences'])

        for word_items in word_partitions:

            # handle short anomalies seperatly
            if len(word_items) < 5:
                continue

            word_count = 0
            for item in word_items:
                if item[0] == "word":
                    word_count += 1

            if word_count == 1:
                word, frequency_classification, definition, word_types, word_endings, sentences = handle_single_word(
                    word_items)

                word_types_str = ','.join(word_types)
                word_endings_str = ','.join(word_endings)
                sentences_str = ','.join(sentences)

                szotar_writer.writerow(
                    [word, frequency_classification, definition, word_types_str, word_endings_str, sentences_str])

            if word_count == 2:
                # TODO handle
                continue

            if word_count > 2:
                # TODO handle
                continue


ordered_classifications = process_and_classify_pdf(INPUT, START_PAGE, END_PAGE)

# exclude first two words, as they are not like the other ones
ordered_classifications = ordered_classifications[4:]

word_partitions = partition_into_words(ordered_classifications)

extract_word_freqiency_and_other(word_partitions)
