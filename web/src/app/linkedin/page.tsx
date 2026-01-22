
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Connect with Muhammed Suhail',
    openGraph: {
        siteName: 'Arrows Design',
        title: 'Muhammed Suhail | Graphic Designer & Web Developer',
        description: 'Graphic Designer @ SkillBee & Founder of Arrows Design. Click to view my professional portfolio and experience.',
        images: 'https://arrowsdesign.me/images/my-profile-pic.png',
        url: 'https://arrowsdesign.me/linkedin',
        type: 'profile',
    },
};

export default function LinkedinRedirect() {
    return (
        <>
            <meta httpEquiv="refresh" content="0; url=https://www.linkedin.com/in/suhailbinsaidalavi/" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.location.href = "https://www.linkedin.com/in/suhailbinsaidalavi/";`,
                }}
            />
            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                <p>Redirecting to LinkedIn Profile...</p>
            </div>
        </>
    );
}
