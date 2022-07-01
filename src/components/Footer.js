import '../ui/styles/Footer.css';

export default function Footer() {

    return <>
        <div class="main-footer">
            <div class="divider-margin"/>
            <hr class="author-info-divider"/>
            <h3>&copy;{new Date().getFullYear()} Cezary Graban | s21752 </h3>
        </div>
    </>
}