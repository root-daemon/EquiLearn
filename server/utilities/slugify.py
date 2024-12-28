def generate_unique_slug(base_slug: str, existing_slugs: set) -> str:
    slug = base_slug
    counter = 1
    while slug in existing_slugs:
        slug = f"{base_slug}-{counter}"
        counter += 1
    return slug


def subject_exists(subject_name: str, existing_subjects: set) -> bool:
    return subject_name.lower() in existing_subjects
