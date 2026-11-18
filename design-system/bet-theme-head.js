/* Sets data-theme before first paint: the saved choice ("bet-theme"), else the system setting. Load it in <head>
   with a plain <script src>, before any stylesheet. Not for claude.ai artifacts (the host sets data-theme). */
(function(){var t=null;try{t=localStorage.getItem("bet-theme")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)})();
