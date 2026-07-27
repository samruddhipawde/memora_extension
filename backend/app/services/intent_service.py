import re


def detect_intent(question: str) -> str:

    question = question.lower().strip()

    greetings = [
        "hi",
        "hello",
        "hey",
        "hii",
        "heyy",
        "good morning",
        "good afternoon",
        "good evening"
    ]

    if question in greetings:
        return "GREETING"

    if any(word in question for word in [
        "today",
        "today's",
        "yesterday",
        "week",
        "month"
    ]):
        return "TIME_QUERY"

    if any(word in question for word in [
        "favorite",
        "favorites",
        "starred"
    ]):
        return "FAVORITES"

    if any(word in question for word in [
        "summary",
        "summarize",
        "recap"
    ]):
        return "SUMMARY"

    if any(word in question for word in [
        "website",
        "websites",
        "visited",
        "domain"
    ]):
        return "WEBSITE"

    return "SEMANTIC_SEARCH"