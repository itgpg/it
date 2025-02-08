
# GPG IT Website Documentation

## Table of Contents
1. [Adding New Events](#events)
2. [Creating Blog Posts](#blogs)
3. [Modifying Styles](#styles)
4. [Updating Configurations](#config)
5. [Troubleshooting](#troubleshoot)

---

## <a name="events"></a>1. Adding New Events

### File Structure
```text
/_events
  YYYY-event-name.md
```

### Steps:
1. Create new markdown file:
```bash
touch _events/2025-new-event.md
```

2. Use this template:
```markdown
---
layout: event
title: "Event Title"
date: YYYY-MM-DD
participants: 0
certificates: 0  # optional
image: /assets/images/events/your-image.jpg
---

![Banner]({{ page.image | relative_url }})

## Event Details
Your content in markdown...
```

3. Add event image to:
```text
/assets/images/events/
```

4. Commit changes:
```bash
git add _events/2025-new-event.md assets/images/events/your-image.jpg
git commit -m "docs: Add new event YYYY-event-name"
```

---

## <a name="blogs"></a>2. Creating Blog Posts

### File Structure
```text
/_posts
  YYYY-MM-DD-post-title.md
```

### Template:
```markdown
---
layout: post
title: "Blog Title"
date: YYYY-MM-DD
author: Author Name
categories: [Category]
image: /assets/images/blog/image.jpg
---

Content in markdown...
```

---

## <a name="styles"></a>3. Modifying Styles

Key style files:
```css:assets/css/pages/events.css
startLine: 1
endLine: 403
```

Custom CSS rules:
```css
/* Add new styles at bottom of file */
.new-element {
    color: var(--primary-color);
    margin: 2rem 0;
}
```

---

## <a name="config"></a>4. Configuration

Edit site settings:
```yaml:_config.yml
startLine: 1
endLine: 11
```

Critical settings:
```yaml
baseurl: "/it"  # Must match GitHub repo name
url: "https://itgpg.github.io"
```

---

## <a name="troubleshoot"></a>5. Troubleshooting

### Common Issues

1. Duplicate Events:
```html:events.html
startLine: 66
endLine: 103
```
Check for multiple entries with same title

2. Missing Images:
```markdown
# Wrong
image: assets/images/event.jpg

# Correct
image: /assets/images/event.jpg
```

3. Date Formatting:
```markdown
# Valid format
date: 2025-02-05

# Invalid
date: "5 February 2025"
```

4. Layout Issues:
```html:_layouts/event.html
startLine: 5
endLine: 51
```
Verify content wrapper structure
```

**Commit the guide:**
```bash
git add MARKDOWN_GUIDE.md
git commit -m "docs: Add project maintenance guide"
git push origin jekyll-migration
```


