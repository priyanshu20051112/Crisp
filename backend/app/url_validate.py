from urllib.parse import urlparse
import re
def validate_url(url):
    parsed=urlparse(url)
    return parsed.scheme in ['http','https'] and parsed.netloc

pattern =r"^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_-]{3,30}$"
def validate_alias(alias):
    return bool(re.fullmatch(pattern,alias))

