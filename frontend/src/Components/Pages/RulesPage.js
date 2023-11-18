const RulesPage = () => {
    const main = document.querySelector("main");
    
    const rulesPage = 
    `
    <div class="full-screen-bg d-flex justify-content-center align-items-center">
        <div class="text-center">
            <p>
                Meme on rit.
            </p>
        </div>
    </div>
    `

    main.innerHTML = rulesPage;
}

export default RulesPage;
