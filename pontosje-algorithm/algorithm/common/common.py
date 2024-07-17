SZOFAJOK = [
    "ige",
    "fn",  # főnév
    "ik",  # igekötő
    "in",  # igenév
    "isz",  # indulatszó
    "hsz",  # határozószó
    "ksz",  # kötőszó
    "mn",  # melléknév
    "msz",  # mondatszó
    "nm",  # névmás
    "nu",  # névutó
    "szn",  # számnév
    "mondatszó",
    "sorszn",
    "törtszn",
    "összetételi előtag",
    "mn-i",
    "tőszn",
    "névszó",
    "kérdőszócska",
    "határozott névelő",
    "határozatlan névelő",
    "segédige",
    "névelő",
    "előtag"
]

STILUSMINOSITESEG = [
    "átvitt",
    "bizalmas",
    "durva",
    "gyermeknyelvi",
    "kedveskedő",
    "népi",
    "régi",
    "ritka",
    "rosszalló",
    "szépítő",
    "szleng",
    "választékos",
]

HATARON_TULI_ROVIDITESEK = ["Fv", "Ka", "Er", "Va", "Dv", "Mv", "Őv"]

SMALL_HUN_ALPHABET = "aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz-"
LARGE_HUN_ALPHABET = "AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ"
NUMERICAL_CHARS = "0123456789"


def contains_non_small_hungarian_chars(word):
    for char in word:
        if char not in SMALL_HUN_ALPHABET:
            return True
    return False
