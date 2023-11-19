const CreditsPage = () => {
    const main = document.querySelector("main");
    
    const creditsPage = 
    `
    <div class="full-screen-bg">
        <div>
            <p>
                Nicolae pue. Beaucoup. Et Kusay est gay !
            </p>
        </div>
    </div>
    `

    main.innerHTML = creditsPage;
}

export default CreditsPage;
