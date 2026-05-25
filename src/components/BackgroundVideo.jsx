export default function BackgroundVideo() {
    return (
        <div>
            <video loop autoPlay muted id="bg-video"
                src="../../public/home-video/clip-race.mp4" type="video/mp4"
                // poster="../../public/home-video/video-poster.jpg"
            >
            </video>
        </div>
    );
}