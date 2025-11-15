# Blog Management System Documentation

## Overview
An advanced blog posting system for The Policy Boss with professional markdown editor, image upload, and edit functionality.

## Admin Panel Features
- **URL**: `http://localhost:3000/admin/blog`
- ✅ Markdown editor with syntax highlighting support
- ✅ Live preview toggle (Edit/Preview mode)
- ✅ Table of contents auto-generation from markdown headings
- ✅ Local image upload (max 5MB)
- ✅ Image preview before publishing
- ✅ Create new blog posts
- ✅ Edit existing blog posts
- ✅ Delete blog posts
- ✅ All posts sidebar for quick access



## Markdown Support
The editor supports the following markdown syntax:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`Inline code`

\`\`\`code block\`\`\`

* List items
```

## API Endpoints

### Create/Update Blog Post
- **URL**: `POST /api/admin/blog`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "title": "Blog Post Title",
  "excerpt": "Short summary of the blog",
  "category": "Life Planning",
  "image": "/uploads/image-123-abc.jpg",
  "content": [
    "Paragraph 1",
    "## Heading",
    "Paragraph 2",
    "### Subheading",
    "Paragraph 3"
  ]
}
```

### Upload Image
- **URL**: `POST /api/admin/upload`
- **Content-Type**: `multipart/form-data`
- **Form Data**: `file: <image file>`
- **Max Size**: 5MB
- **Allowed Types**: PNG, JPG, JPEG, GIF, WebP, AVIF
- **Response**: 
```json
{
  "success": true,
  "url": "/uploads/timestamp-random.jpg",
  "filename": "timestamp-random.jpg"
}
```

### Get All Blog Posts
- **URL**: `GET /api/admin/blog`
- **Response**: `{ data: [{ slug, title, excerpt, category, date, image, content: [...] }, ...] }`

### Get Single Blog Post
- **URL**: `GET /api/admin/blog?slug=blog-slug`
- **Response**: `{ data: { slug, title, excerpt, category, date, image, content: [...] } }`

### Delete Blog Post
- **URL**: `DELETE /api/admin/blog?slug=blog-slug`
- **Response**: `{ success: true, message: "Blog deleted successfully" }`

## Data Storage
- **Posts File**: `data/blogs.json`
- **Uploads Directory**: `public/uploads/`
- Format: JSON array of blog post objects
- Each post includes: slug, title, excerpt, category, date, image, content array

## Features
- ✅ Professional markdown editor with syntax support
- ✅ Live preview mode
- ✅ Auto table of contents from headings
- ✅ Local image upload with validation
- ✅ Image preview before publishing
- ✅ Edit existing blog posts
- ✅ Auto slug generation from title
- ✅ Auto-date assignment on creation
- ✅ Categories support
- ✅ API accessible from external programs
- ✅ Responsive design

## Examples

### Writer's Workflow

#### Creating a New Blog
1. Go to `http://localhost:3000/admin/blog`
2. Fill in Title and Excerpt
3. Select Category
4. Upload Featured Image (click "Upload Image" button)
5. Write content in Markdown (left side)
6. Click "Preview" to see how it will look
7. Switch back to "Edit" to make changes
8. Watch the Table of Contents auto-generate from your headings
9. Click "Publish Blog Post" to publish

#### Editing an Existing Blog
1. Find the blog in the "Posts" sidebar
2. Click "Edit" button
3. Make your changes
4. Click "Update Blog" to save

#### Markdown Writing Tips
- Use `#`, `##`, `###` for headings (they become table of contents items)
- Use `**text**` for bold, `*text*` for italic
- Use `` `code` `` for inline code
- Use triple backticks for code blocks
- Separate paragraphs with blank lines
- Use `* item` for bullet points

### Using cURL to create a blog
```bash
curl -X POST http://localhost:3000/api/admin/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Blog Post",
    "excerpt": "This is a summary",
    "category": "Insurance Tips",
    "image": "https://example.com/image.jpg",
    "content": ["First paragraph", "Second paragraph", "Third paragraph"]
  }'
```

### Using Python to create a blog
```python
import requests

url = "http://localhost:3000/api/admin/blog"
data = {
    "title": "My New Blog Post",
    "excerpt": "This is a summary",
    "category": "Insurance Tips",
    "image": "https://example.com/image.jpg",
    "content": ["First paragraph", "Second paragraph", "Third paragraph"]
}
response = requests.post(url, json=data)
print(response.json())
```

### Using Node.js to create a blog
```javascript
const fetch = require('node-fetch');

const data = {
  title: "My New Blog Post",
  excerpt: "This is a summary",
  category: "Insurance Tips",
  image: "https://example.com/image.jpg",
  content: ["First paragraph", "Second paragraph", "Third paragraph"]
};

fetch("http://localhost:3000/api/admin/blog", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(data => console.log(data));
```

## Future Enhancements
- Add authentication/authorization to admin routes
- Add database storage (MongoDB, PostgreSQL, etc.)
- Add image upload instead of just URL
- Add rich text editor in admin panel
- Add scheduled publishing
- Add draft/published status
