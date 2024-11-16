import DOMPurify from "dompurify";

const SafeHTMLContent = ({
  content = "",
  className = "",
  truncate = false,
  maxLength = 200,
}) => {
  const sanitizedContent = content ? DOMPurify.sanitize(content) : "";

  let displayContent = sanitizedContent;
  if (truncate && sanitizedContent.length > maxLength) {
    // Remove HTML tags for length calculation
    const textContent = sanitizedContent.replace(/<[^>]*>/g, "");
    if (textContent.length > maxLength) {
      displayContent = textContent.slice(0, maxLength) + "...";
    }
  }

  return (
    <div
      className={`prose dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: displayContent }}
    />
  );
};

export default SafeHTMLContent;
