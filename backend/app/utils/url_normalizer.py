from urllib.parse import urlparse, parse_qs, urlencode, urlunparse


def normalize_url(url: str) -> str:
    """
    Normalize URLs to avoid duplicate memories caused by
    tracking parameters or playlist information.
    """

    parsed = urlparse(url)

    # -----------------------------
    # YouTube
    # -----------------------------
    if "youtube.com" in parsed.netloc:

        params = parse_qs(parsed.query)

        clean_params = {}

        # Keep only video id
        if "v" in params:
            clean_params["v"] = params["v"][0]

        new_query = urlencode(clean_params)

        return urlunparse((
            parsed.scheme,
            parsed.netloc,
            parsed.path,
            "",
            new_query,
            ""
        ))

    # -----------------------------
    # youtu.be
    # -----------------------------
    if "youtu.be" in parsed.netloc:

        return urlunparse((
            parsed.scheme,
            parsed.netloc,
            parsed.path,
            "",
            "",
            ""
        ))

    # -----------------------------
    # Default
    # -----------------------------
    return url