(async function(){const t=await fetch("https://restcountries.com/v3.1/name/Ukraine");if(!t.ok)throw new Error(t.statusText);return t.json()})().then((t=>console.log(t))).catch((t=>console.log(t)));
//# sourceMappingURL=index.600acfd6.js.map
