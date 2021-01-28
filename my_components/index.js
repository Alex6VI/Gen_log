const getBaseURL = () => {
    return new URL('.',
        import.meta.url);
};

class MyLogo extends HTMLElement {
    html = `
       <div id = "logo" class = "" >mon logo</div>
       <br>
       <input type='color'id='colorSelect'>
       Choisissez la taille du logo<input type="range" min="1" max="500" id="sizeSelect"/>

       `;

    style = `
       #logo {
             font-size:40px;
             display:inline-block;
             text-shadow: 0 1px 0 #ccc,
                          0 2px 0 #c9c9c9,
                          0 3px 0 #bbb,
                          0 4px 0 #b9b9b9,
                          0 5px 0 #aaa,
                          0 6px 1px rgba(0,0,0,.1),
                          0 0 5px rgba(0,0,0,.1),
                          0 1px 3px rgba(0,0,0,.3),
                          0 3px 5px rgba(0,0,0,.2),
                          0 5px 10px rgba(0,0,0,.25),
                          0 10px 10px rgba(0,0,0,.2),
                          0 20px 20px rgba(0,0,0,.15); 

            }
           .ping {
                animation: ping 2s ease-in-out infinite both;
            }
            .color-change-2x {
                animation: color-change-2x 2s linear infinite alternate both;
            }

        @keyframes color-change-2x {
        0% {
         background: #19dcea;
        }
        100% {
            background: #b22cff;
            }
        }
          @keyframes ping {
             0% {
                transform: scale(0.2);
                opacity: 0.8;
                }
             80% {
                 transform: scale(1.2);
                 opacity: 0;
                  }
             100% {
                 transform: scale(2.2);
                 opacity: 0;
            }
        }
        .glow {
            font-size: 80px;
            color: #fff;
            text-align: center;
            -webkit-animation: glow 1s ease-in-out infinite alternate;
            -moz-animation: glow 1s ease-in-out infinite alternate;
            animation: glow 1s ease-in-out infinite alternate;
          }
          @-webkit-keyframes glow {
            from {
              text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
            }
            
            to {
              text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
            }
          }
        `;
    constructor() {
        console.log("constructor")

        super();
        this.attachShadow({ mode: "open" });
        this.couleur = this.getAttribute("couleur");
        this.text = this.getAttribute("text");
        this.fontSize = this.getAttribute("fontSize");

        this.animationClass = this.getAttribute("animation");
        console.log("couleur = " + this.couleur);
    }
    fixRelativeURLs() {
        let images = this.shadowRoot.querySelectorAll('img');
        images.forEach((e) => {
            console.log("dans le foreach")
            let imagePath = e.getAttribute('src');
            e.src = getBaseURL() + '/' + imagePath;
        });

        this.myLogo.style.background = "url(" + getBaseURL() + "images/gif-anime.gif)";
    }
    connectedCallback() {
        console.log("connectedCallBack")
        this.shadowRoot.innerHTML = `<style>${this.style}</style>` + this.html;
        this.myLogo = this.shadowRoot.querySelector("#logo");
        this.fixRelativeURLs();
        this.myLogo.addEventListener("click", () => {
            console.log("Logo clické");
        })
        this.myLogo.style.color = this.couleur;
        this.myLogo.style.fontSize = this.fontSize;
        this.myLogo.textContent = this.text;
        if (this.animationClass)
            this.myLogo.classList.add(this.animationClass);

        this.shadowRoot
            .querySelector("#colorSelect")
            .addEventListener("input", (event) => {
                this.myLogo.style.color = event.target.value;
            })

        this.shadowRoot
            .querySelector("#sizeSelect")
            .addEventListener("input", (event) => {
                this.myLogo.style.fontSize = event.target.value + "px";
            })


    }

    changeText(newText) {
        this.myLogo.textContent = newText;
    }
}
customElements.define("mon-logo", MyLogo);