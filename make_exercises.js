// Uso: node make_exercises.js [dias_hacia_adelante] [semilla]
// Genera exercises.json con los ejercicios de los ultimos 14 dias y los proximos N dias.
const fs=require("fs"),path=require("path");
const days=+process.argv[2]||60,salt=process.argv[3]||"v1";
const html=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
const a=html.indexOf("var R=Math.random;"),b=html.indexOf("var LV=");
const lib=html.slice(a,b).split("\n").filter(l=>!l.includes("REMOTE")).join("\n");
const run=new Function("days","salt",lib+`
var L3=["easy","medium","hard"],T=[["integrales",["beginner","easy","medium","hard"]],["derivadas",L3],["limite",L3],["ingenieria",L3],["lilypath",L3],["logica",L3],["diferenciales",L3]],out={};
for(var i=-14;i<=days;i++){var d=dk(new Date(Date.now()+i*864e5));T.forEach(function(t){t[1].forEach(function(l){seed(salt+t[0]+l+d);out[t[0]+"|"+l+"|"+d]=G[t[0]](l);R=Math.random})})}
return out;`);
const out=run(days,salt);
fs.writeFileSync(path.join(__dirname,"exercises.json"),JSON.stringify(out));
console.log(Object.keys(out).length+" ejercicios generados");
