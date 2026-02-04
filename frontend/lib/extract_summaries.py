import re
import json

# Read the jobsData.ts file
with open('jobsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all jobs with id and summary
job_pattern = r'{\s*id:\s*(\d+),[\s\S]*?summary:\s*"([^"]*(?:\\"[^"]*)*)"'
matches = re.findall(job_pattern, content)

print('=' * 80)
print('📋 SUMMARY MIGRATION PREVIEW - All 22 Jobs')
print('=' * 80)
print()

results = []

for job_id, summary in matches:
    # Unescape the summary
    summary = summary.replace('\\"', '"')

    # Check if contains Japanese characters
    has_japanese = bool(re.search(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]', summary))

    if has_japanese:
        # Try to split English and Japanese parts
        # Look for last period before Japanese characters
        parts = re.split(r'(?<=\.\s)(?=[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF])', summary)

        if len(parts) > 1:
            en = parts[0].strip()
            jp = ''.join(parts[1:]).strip()
        else:
            # Japanese is mixed, extract separately
            en_match = re.match(r'^[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+', summary)
            jp_match = re.search(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF][^\.]*(?:\.[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]*)?$', summary)

            en = en_match.group(0).strip() if en_match else summary
            jp = jp_match.group(0).strip() if jp_match else ''
    else:
        en = summary
        jp = '// TODO: needs Japanese translation'

    result = {
        'id': job_id,
        'original': summary[:100] + ('...' if len(summary) > 100 else ''),
        'en': en,
        'jp': jp
    }
    results.append(result)

    print(f'Job ID: {job_id}')
    print(f'Original: "{summary[:100]}{"..." if len(summary) > 100 else ""}"')
    print(f'Split Result:')
    print(f'  en: "{en}"')
    print(f'  jp: "{jp}"')
    print('-' * 80)
    print()

print(f'Total jobs processed: {len(results)}')

# Save to JSON for later use
with open('migration_preview.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f'\n✅ Preview saved to: migration_preview.json')
