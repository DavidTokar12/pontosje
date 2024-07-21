from celery import shared_task
from lxml import etree


def append_corrected_to_words(xml_string):
    root = etree.fromstring(xml_string)
    transform_words(root)
    return etree.tostring(root, pretty_print=True).decode()


def transform_words(element):
    if element.tag == 'word':
        element.text = (element.text or '') + 'Corrected'

    for child in element:
        transform_words(child)


def create_corrected_dict(xml_input):
    root = etree.fromstring(xml_input)
    corrected_dict = {}
    
    for word in root.xpath('//word'):
        word_id = word.get('id')
        corrected_word = word.text + 'Corrected'
        corrected_dict[word_id] = corrected_word
    
    return corrected_dict


def remove_corrected_words_by_id(xml_text, corrected_ids):
    """
    Remove words with IDs in corrected_ids from the XML text.
    """
    root = etree.fromstring(xml_text)
    
    # Find and remove words with IDs in corrected_ids
    for word in root.xpath('//word'):
        if word.get('id') in corrected_ids:
            word.getparent().remove(word)
    
    return etree.tostring(root, pretty_print=True).decode()

@shared_task
def correct_grammar(text):
    return append_corrected_to_words(text)
