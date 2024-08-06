export default function YoutubeVideo() {
  return (
    <div className="">
      <iframe
        width="400"
        height="225"
        src="https://www.youtube.com/embed/z6cGLsx82NI?si=U3mqAaZXMRXe6mJF"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
