const CreditsPage = () => {
    const main = document.querySelector("main");
    
    const creditsPage = 
    `
    <div class="full-screen-bg">
        <div>
            <p>
                On ne rit plus.
            </p>
        </div>
    </div>
    `

    main.innerHTML = creditsPage;
}

export default CreditsPage;
