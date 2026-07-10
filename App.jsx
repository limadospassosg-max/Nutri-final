import { useState } from "react";

const C = {
  bg:"#F5F7F2", card:"#FFFFFF", cardAlt:"#EEF4E8",
  border:"#D6E8C8", borderMid:"#C0D9A8",
  green:"#3A8C4E", greenDark:"#245E33", greenLight:"#72BF7A",
  lime:"#8DC63F", text:"#1E2D1F", textMid:"#4A6650", textMuted:"#84A888",
  accent:"#E07B39", accentYel:"#D4A017", blue:"#3B82C4", blueLight:"#DBEAFE",
  red:"#C0392B", purple:"#7C5CBF",
};

const XP_MEAL=20, XP_WATER=10;

// ─── FOOD DB ─────────────────────────────────────────────────────────────────
const FOOD_DB = {
  proteinas:[
    {name:"Frango grelhado",cal:165,prot:31,carb:0,fat:3.6,portion:"100g"},
    {name:"Peito de peru",cal:135,prot:29,carb:0,fat:1.8,portion:"100g"},
    {name:"Ovo cozido",cal:78,prot:6,carb:1,fat:5,portion:"1 unid."},
    {name:"Omelete (2 ovos)",cal:148,prot:11,carb:1,fat:10,portion:"1 porção"},
    {name:"Atum em lata",cal:116,prot:26,carb:0,fat:1,portion:"100g"},
    {name:"Sardinha",cal:208,prot:25,carb:0,fat:11,portion:"100g"},
    {name:"Salmão",cal:208,prot:22,carb:0,fat:13,portion:"100g"},
    {name:"Tilápia",cal:96,prot:20,carb:0,fat:2,portion:"100g"},
    {name:"Carne bovina magra",cal:215,prot:26,carb:0,fat:12,portion:"100g"},
    {name:"Carne moída (patinho)",cal:189,prot:21,carb:0,fat:11,portion:"100g"},
    {name:"Feijão preto",cal:132,prot:8.9,carb:24,fat:0.5,portion:"100g"},
    {name:"Feijão carioca",cal:127,prot:7.8,carb:23,fat:0.5,portion:"100g"},
    {name:"Lentilha",cal:116,prot:9,carb:20,fat:0.4,portion:"100g"},
    {name:"Grão-de-bico",cal:164,prot:9,carb:27,fat:2.6,portion:"100g"},
    {name:"Tofu firme",cal:76,prot:8,carb:2,fat:4.2,portion:"100g"},
    {name:"Edamame",cal:121,prot:11,carb:9,fat:5,portion:"100g"},
    {name:"Iogurte grego natural",cal:97,prot:9,carb:4,fat:5,portion:"100g"},
    {name:"Queijo cottage",cal:98,prot:11,carb:3.4,fat:4.3,portion:"100g"},
    {name:"Ricota",cal:174,prot:11,carb:3,fat:13,portion:"100g"},
    {name:"Amendoim (porção)",cal:170,prot:7.7,carb:4.8,fat:14.7,portion:"30g"},
    {name:"Costela suína magra",cal:242,prot:27,carb:0,fat:14,portion:"100g"},
  ],
  carboidratos:[
    {name:"Arroz branco",cal:130,prot:2.7,carb:28,fat:0.3,portion:"100g cozido"},
    {name:"Arroz integral",cal:111,prot:2.6,carb:23,fat:0.9,portion:"100g cozido"},
    {name:"Batata inglesa",cal:77,prot:2,carb:17,fat:0.1,portion:"100g"},
    {name:"Batata-doce",cal:86,prot:1.6,carb:20,fat:0.1,portion:"100g"},
    {name:"Batata baroa",cal:99,prot:1.3,carb:24,fat:0.1,portion:"100g"},
    {name:"Aveia em flocos",cal:389,prot:17,carb:66,fat:7,portion:"100g"},
    {name:"Aveia (porção 30g)",cal:117,prot:5.1,carb:20,fat:2.1,portion:"30g"},
    {name:"Pão integral",cal:247,prot:13,carb:41,fat:4,portion:"100g"},
    {name:"Pão francês",cal:300,prot:9,carb:58,fat:3,portion:"100g"},
    {name:"Pão sem glúten",cal:220,prot:3,carb:46,fat:3,portion:"100g"},
    {name:"Macarrão integral",cal:124,prot:5.3,carb:26,fat:0.5,portion:"100g cozido"},
    {name:"Macarrão de arroz",cal:109,prot:2,carb:25,fat:0.1,portion:"100g cozido"},
    {name:"Quinoa",cal:120,prot:4.4,carb:22,fat:1.9,portion:"100g cozida"},
    {name:"Mandioca cozida",cal:160,prot:1.4,carb:38,fat:0.3,portion:"100g"},
    {name:"Milho cozido",cal:96,prot:3.4,carb:21,fat:1.5,portion:"100g"},
    {name:"Tapioca",cal:340,prot:0.7,carb:85,fat:0.2,portion:"100g"},
    {name:"Cuscuz de milho",cal:112,prot:2.5,carb:24,fat:0.5,portion:"100g cozido"},
    {name:"Polenta",cal:70,prot:1.7,carb:15,fat:0.4,portion:"100g cozida"},
    {name:"Farinha de mandioca",cal:361,prot:1.6,carb:87,fat:0.4,portion:"100g"},
    {name:"Biscoito de arroz",cal:387,prot:8,carb:82,fat:3,portion:"100g"},
  ],
  vegetais:[
    {name:"Brócolis",cal:34,prot:2.8,carb:7,fat:0.4,portion:"100g"},
    {name:"Couve-flor",cal:25,prot:1.9,carb:5,fat:0.3,portion:"100g"},
    {name:"Espinafre",cal:23,prot:2.9,carb:3.6,fat:0.4,portion:"100g"},
    {name:"Couve",cal:49,prot:4.3,carb:9,fat:0.9,portion:"100g"},
    {name:"Alface",cal:15,prot:1.4,carb:2.9,fat:0.2,portion:"100g"},
    {name:"Rúcula",cal:25,prot:2.6,carb:3.7,fat:0.7,portion:"100g"},
    {name:"Cenoura",cal:41,prot:0.9,carb:10,fat:0.2,portion:"100g"},
    {name:"Beterraba",cal:43,prot:1.6,carb:10,fat:0.2,portion:"100g"},
    {name:"Tomate",cal:18,prot:0.9,carb:3.9,fat:0.2,portion:"100g"},
    {name:"Abobrinha",cal:17,prot:1.2,carb:3.1,fat:0.3,portion:"100g"},
    {name:"Berinjela",cal:25,prot:1,carb:5.9,fat:0.2,portion:"100g"},
    {name:"Pepino",cal:16,prot:0.7,carb:3.6,fat:0.1,portion:"100g"},
    {name:"Pimentão vermelho",cal:31,prot:1,carb:7.2,fat:0.3,portion:"100g"},
    {name:"Pimentão verde",cal:20,prot:0.9,carb:4.6,fat:0.2,portion:"100g"},
    {name:"Cebola",cal:40,prot:1.1,carb:9.3,fat:0.1,portion:"100g"},
    {name:"Chuchu",cal:19,prot:0.7,carb:4.5,fat:0.1,portion:"100g"},
    {name:"Vagem",cal:31,prot:1.8,carb:7,fat:0.1,portion:"100g"},
    {name:"Quiabo",cal:33,prot:2,carb:7.5,fat:0.1,portion:"100g"},
    {name:"Repolho",cal:25,prot:1.3,carb:5.8,fat:0.1,portion:"100g"},
    {name:"Acelga",cal:19,prot:1.8,carb:3.7,fat:0.2,portion:"100g"},
    {name:"Aspargo",cal:20,prot:2.2,carb:3.7,fat:0.1,portion:"100g"},
    {name:"Palmito",cal:28,prot:2.7,carb:5.1,fat:0.2,portion:"100g"},
  ],
  frutas:[
    {name:"Banana",cal:89,prot:1.1,carb:23,fat:0.3,portion:"1 unid. méd."},
    {name:"Maçã",cal:52,prot:0.3,carb:14,fat:0.2,portion:"1 unid. méd."},
    {name:"Pera",cal:57,prot:0.4,carb:15,fat:0.1,portion:"1 unid. méd."},
    {name:"Laranja",cal:47,prot:0.9,carb:12,fat:0.1,portion:"1 unid. méd."},
    {name:"Tangerina",cal:53,prot:0.8,carb:13,fat:0.3,portion:"1 unid. méd."},
    {name:"Mamão",cal:43,prot:0.5,carb:11,fat:0.3,portion:"100g"},
    {name:"Abacaxi",cal:50,prot:0.5,carb:13,fat:0.1,portion:"100g"},
    {name:"Manga",cal:60,prot:0.8,carb:15,fat:0.4,portion:"100g"},
    {name:"Morango",cal:32,prot:0.7,carb:7.7,fat:0.3,portion:"100g"},
    {name:"Melancia",cal:30,prot:0.6,carb:7.6,fat:0.2,portion:"100g"},
    {name:"Melão",cal:34,prot:0.8,carb:8,fat:0.2,portion:"100g"},
    {name:"Uva",cal:67,prot:0.6,carb:17,fat:0.4,portion:"100g"},
    {name:"Kiwi",cal:61,prot:1.1,carb:15,fat:0.5,portion:"100g"},
    {name:"Goiaba",cal:68,prot:2.6,carb:14,fat:1,portion:"100g"},
    {name:"Açaí (polpa s/ açúcar)",cal:58,prot:1.5,carb:6,fat:5.1,portion:"100g"},
    {name:"Abacate",cal:160,prot:2,carb:9,fat:15,portion:"100g"},
    {name:"Caju",cal:43,prot:0.9,carb:9,fat:0.2,portion:"100g"},
    {name:"Graviola",cal:66,prot:1,carb:16,fat:0.3,portion:"100g"},
  ],
  gordurasBoas:[
    {name:"Azeite (1 c. sopa)",cal:119,prot:0,carb:0,fat:13.5,portion:"1 c. sopa"},
    {name:"Castanha-do-pará",cal:659,prot:14,carb:12,fat:67,portion:"100g"},
    {name:"Castanha de caju",cal:553,prot:18,carb:30,fat:44,portion:"100g"},
    {name:"Nozes",cal:654,prot:15,carb:14,fat:65,portion:"100g"},
    {name:"Amêndoas",cal:579,prot:21,carb:22,fat:50,portion:"100g"},
    {name:"Chia (1 c. sopa)",cal:58,prot:2,carb:5,fat:3.7,portion:"14g"},
    {name:"Linhaça dourada",cal:534,prot:18,carb:29,fat:42,portion:"100g"},
    {name:"Pasta de amendoim nat.",cal:598,prot:25,carb:20,fat:50,portion:"100g"},
    {name:"Coco ralado s/ açúcar",cal:660,prot:7,carb:24,fat:65,portion:"100g"},
    {name:"Abacate (porção)",cal:160,prot:2,carb:9,fat:15,portion:"100g"},
  ],
  laticinios:[
    {name:"Leite integral",cal:61,prot:3.2,carb:4.8,fat:3.3,portion:"100ml"},
    {name:"Leite desnatado",cal:35,prot:3.4,carb:5,fat:0.1,portion:"100ml"},
    {name:"Leite de amêndoas",cal:17,prot:0.6,carb:0.6,fat:1.4,portion:"100ml"},
    {name:"Leite de coco",cal:230,prot:2.3,carb:5.5,fat:23,portion:"100ml"},
    {name:"Leite de aveia",cal:47,prot:1,carb:8,fat:1.5,portion:"100ml"},
    {name:"Iogurte natural",cal:59,prot:3.5,carb:4.7,fat:3.3,portion:"100g"},
    {name:"Iogurte desnatado",cal:43,prot:4,carb:5.5,fat:0.5,portion:"100g"},
    {name:"Iogurte sem lactose",cal:55,prot:3.3,carb:5,fat:2.8,portion:"100g"},
    {name:"Queijo minas frescal",cal:264,prot:17,carb:3,fat:20,portion:"100g"},
    {name:"Queijo mussarela",cal:280,prot:22,carb:2.2,fat:22,portion:"100g"},
    {name:"Queijo sem lactose",cal:270,prot:20,carb:2,fat:21,portion:"100g"},
    {name:"Manteiga",cal:717,prot:0.9,carb:0.1,fat:81,portion:"100g"},
    {name:"Margarina vegetal",cal:540,prot:0,carb:0,fat:60,portion:"100g"},
  ],
};

// ─── DIET PLANS (7 days each) ─────────────────────────────────────────────────
const WEEK = ["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"];

const DIET_SUGGESTIONS = {
  emagrecimento:{
    title:"Emagrecimento", icon:"🔥", color:"#E07B39",
    tag:"Déficit Calórico",
    description:"Déficit calórico moderado (~300-500 kcal/dia), rica em proteínas e fibras para saciedade prolongada.",
    days:[
      {day:"Segunda",meals:["☀️ Café: Ovos mexidos (2) + pão integral + laranja","🌞 Almoço: Frango grelhado 150g + brócolis + arroz integral pequeno","🍎 Lanche: Iogurte grego + morangos","🌙 Jantar: Sopa de lentilha com legumes"]},
      {day:"Terça",meals:["☀️ Café: Aveia 40g + banana + canela","🌞 Almoço: Atum 120g + salada verde + batata-doce 100g","🍎 Lanche: Maçã + 10 amêndoas","🌙 Jantar: Tofu grelhado + espinafre refogado"]},
      {day:"Quarta",meals:["☀️ Café: Iogurte desnatado + granola s/ açúcar","🌞 Almoço: Sardinha + arroz integral + cenoura e vagem","🍎 Lanche: Laranja","🌙 Jantar: Tilápia 150g + abobrinha e pimentão grelhados"]},
      {day:"Quinta",meals:["☀️ Café: Tapioca de ovo + fruta","🌞 Almoço: Frango 150g + quinoa + salada colorida","🍎 Lanche: Iogurte grego + kiwi","🌙 Jantar: Sopa de feijão com legumes"]},
      {day:"Sexta",meals:["☀️ Café: Ovos cozidos (2) + pão integral","🌞 Almoço: Atum + batata-doce + brócolis","🍎 Lanche: Pera + nozes (20g)","🌙 Jantar: Frango desfiado + salada + arroz integral"]},
      {day:"Sábado",meals:["☀️ Café: Omelete de legumes + suco de laranja natural","🌞 Almoço: Peixe assado + arroz integral + ratatouille de legumes","🍎 Lanche: Morango + iogurte natural","🌙 Jantar: Sopa de lentilha + cenoura + espinafre"]},
      {day:"Domingo",meals:["☀️ Café: Panqueca de aveia + banana + mel","🌞 Almoço: Frango assado + salada + batata-doce","🍎 Lanche: Frutas variadas","🌙 Jantar: Ovos mexidos + pão integral + salada leve"]},
    ],
  },
  hipertrofia:{
    title:"Hipertrofia", icon:"💪", color:"#3B82C4",
    tag:"Ganho de Massa",
    description:"Superávit calórico moderado, alta ingestão proteica (1,8-2,2g/kg) para ganho de massa muscular.",
    days:[
      {day:"Segunda",meals:["☀️ Café: 3 ovos + pão integral + banana + leite","🌞 Almoço: Carne bovina 200g + arroz + feijão + salada","🍎 Lanche: Iogurte grego + aveia 40g + mel","🌙 Jantar: Frango 200g + macarrão integral + brócolis"]},
      {day:"Terça",meals:["☀️ Café: Omelete 3 ovos + aveia + manga","🌞 Almoço: Grão-de-bico + arroz integral + frango + brócolis","🍎 Lanche: Banana + pasta de amendoim","🌙 Jantar: Salmão 150g + batata-doce + espinafre"]},
      {day:"Quarta",meals:["☀️ Café: Aveia + leite + castanhas + fruta","🌞 Almoço: Carne moída + arroz + feijão + salada","🍎 Lanche: Iogurte + granola + morango","🌙 Jantar: Frango + macarrão integral + legumes"]},
      {day:"Quinta",meals:["☀️ Café: Ovos mexidos + pão integral + suco","🌞 Almoço: Peixe 200g + quinoa + salada + azeite","🍎 Lanche: Leite + banana + pasta de amendoim","🌙 Jantar: Frango assado + arroz integral + feijão"]},
      {day:"Sexta",meals:["☀️ Café: 3 ovos + tapioca + queijo + fruta","🌞 Almoço: Carne bovina + batata-doce + salada","🍎 Lanche: Iogurte grego + aveia + kiwi","🌙 Jantar: Sardinha + arroz integral + brócolis"]},
      {day:"Sábado",meals:["☀️ Café: Panqueca de aveia e banana + leite","🌞 Almoço: Frango assado + arroz + feijão + salada completa","🍎 Lanche: Vitamina de leite + banana + aveia","🌙 Jantar: Omelete 3 ovos + pão integral + salada"]},
      {day:"Domingo",meals:["☀️ Café: Ovos mexidos + pão + queijo + suco","🌞 Almoço: Peixe assado + arroz integral + legumes variados","🍎 Lanche: Frutas + castanhas + iogurte","🌙 Jantar: Frango + macarrão + brócolis + azeite"]},
    ],
  },
  vegetariana:{
    title:"Vegetariana", icon:"🌿", color:"#3A8C4E",
    tag:"Sem Carnes",
    description:"Equilibrada sem carnes, rica em proteínas vegetais, ferro e vitaminas do complexo B.",
    days:[
      {day:"Segunda",meals:["☀️ Café: Aveia + frutas + chia + leite","🌞 Almoço: Lentilha 150g + arroz integral + couve + tomate","🍎 Lanche: Iogurte + banana + castanha","🌙 Jantar: Tofu grelhado + quinoa + legumes assados"]},
      {day:"Terça",meals:["☀️ Café: Pão integral + ovos mexidos + suco","🌞 Almoço: Grão-de-bico + salada verde + quinoa + azeite","🍎 Lanche: Frutas + amendoim","🌙 Jantar: Feijão preto + arroz + beterraba refogada"]},
      {day:"Quarta",meals:["☀️ Café: Iogurte + granola + morango","🌞 Almoço: Omelete de legumes + arroz integral + salada","🍎 Lanche: Maçã + castanha-do-pará","🌙 Jantar: Lentilha + batata-doce + espinafre"]},
      {day:"Quinta",meals:["☀️ Café: Tapioca com ovo + suco de laranja","🌞 Almoço: Tofu + macarrão integral + brócolis e cenoura","🍎 Lanche: Pera + nozes","🌙 Jantar: Sopa de feijão com legumes"]},
      {day:"Sexta",meals:["☀️ Café: Aveia + banana + mel + leite","🌞 Almoço: Grão-de-bico + arroz + salada colorida","🍎 Lanche: Iogurte grego + kiwi","🌙 Jantar: Omelete 3 ovos + pão integral"]},
      {day:"Sábado",meals:["☀️ Café: Panqueca de aveia + frutas","🌞 Almoço: Lasanha de berinjela com ricota + salada verde","🍎 Lanche: Smoothie de banana + espinafre","🌙 Jantar: Quinoa + legumes grelhados + iogurte"]},
      {day:"Domingo",meals:["☀️ Café: Ovos cozidos + pão integral + frutas","🌞 Almoço: Feijoada de legumes + arroz + couve + laranja","🍎 Lanche: Frutas variadas + amendoim","🌙 Jantar: Sopa de lentilha + cenoura + pão integral"]},
    ],
  },
  celiaca:{
    title:"Doença Celíaca", icon:"🌾", color:"#C0392B",
    tag:"Sem Glúten",
    description:"100% isenta de glúten (trigo, cevada, centeio). Atenção a contaminação cruzada em todos os alimentos.",
    alert:"⚠️ Sempre verifique o rótulo: glúten pode estar oculto em molhos, temperos e alimentos processados.",
    days:[
      {day:"Segunda",meals:["☀️ Café: Tapioca de banana + ovo mexido + suco natural","🌞 Almoço: Frango grelhado + arroz branco + feijão + salada","🍎 Lanche: Iogurte natural + morango + castanha","🌙 Jantar: Peixe assado + batata-doce + brócolis"]},
      {day:"Terça",meals:["☀️ Café: Mingau de polenta + banana + mel","🌞 Almoço: Carne bovina + arroz integral + lentilha + salada","🍎 Lanche: Fruta + amendoim","🌙 Jantar: Omelete 2 ovos + mandioca cozida + salada"]},
      {day:"Quarta",meals:["☀️ Café: Tapioca com queijo sem lactose + fruta","🌞 Almoço: Frango + quinoa + legumes assados + azeite","🍎 Lanche: Maçã + castanha-do-pará","🌙 Jantar: Salmão + arroz integral + espinafre"]},
      {day:"Quinta",meals:["☀️ Café: Ovos mexidos + tapioca + suco","🌞 Almoço: Atum + batata-doce + cenoura + vagem","🍎 Lanche: Iogurte + banana","🌙 Jantar: Sopa de feijão com legumes (s/ farinha)"]},
      {day:"Sexta",meals:["☀️ Café: Creme de arroz + fruta + ovo","🌞 Almoço: Peixe 150g + arroz + salada colorida","🍎 Lanche: Biscoito de arroz + pasta de amendoim","🌙 Jantar: Frango + cuscuz de milho + legumes"]},
      {day:"Sábado",meals:["☀️ Café: Panqueca de farinha de arroz + mel + banana","🌞 Almoço: Carne assada + arroz integral + feijão + couve","🍎 Lanche: Frutas variadas + nozes","🌙 Jantar: Omelete de legumes + mandioca + salada"]},
      {day:"Domingo",meals:["☀️ Café: Tapioca com ovo + suco de laranja","🌞 Almoço: Frango assado + polenta + salada + azeite","🍎 Lanche: Iogurte + morango + chia","🌙 Jantar: Sopa de lentilha com legumes (s/ massas)"]},
    ],
  },
  intoleranciaLactose:{
    title:"Intolerância à Lactose", icon:"🥛", color:"#7C5CBF",
    tag:"Sem Lactose",
    description:"Elimina lactose mantendo cálcio via fontes vegetais e produtos sem lactose. Digestão confortável e nutrição completa.",
    alert:"⚠️ Verifique rótulos: lactose pode estar em pães, embutidos, medicamentos e molhos prontos.",
    days:[
      {day:"Segunda",meals:["☀️ Café: Aveia + leite de amêndoas + banana","🌞 Almoço: Frango grelhado + arroz + feijão + salada + azeite","🍎 Lanche: Iogurte sem lactose + morango","🌙 Jantar: Peixe + batata-doce + brócolis"]},
      {day:"Terça",meals:["☀️ Café: Tapioca de banana + ovos + suco","🌞 Almoço: Atum + quinoa + salada colorida + azeite","🍎 Lanche: Frutas + castanha-do-pará","🌙 Jantar: Frango + macarrão de arroz + legumes"]},
      {day:"Quarta",meals:["☀️ Café: Mingau de aveia com leite de coco + fruta","🌞 Almoço: Carne bovina + arroz integral + feijão + cenoura","🍎 Lanche: Maçã + amendoim","🌙 Jantar: Tofu grelhado + arroz + espinafre"]},
      {day:"Quinta",meals:["☀️ Café: Ovos mexidos + pão integral + suco","🌞 Almoço: Sardinha + batata-doce + salada verde","🍎 Lanche: Iogurte sem lactose + banana","🌙 Jantar: Sopa de lentilha + legumes"]},
      {day:"Sexta",meals:["☀️ Café: Vitamina de leite de aveia + banana + chia","🌞 Almoço: Frango + arroz + feijão + couve","🍎 Lanche: Kiwi + nozes","🌙 Jantar: Omelete 2 ovos + legumes + salada"]},
      {day:"Sábado",meals:["☀️ Café: Panqueca de aveia + leite de amêndoas + mel","🌞 Almoço: Peixe assado + arroz integral + salada","🍎 Lanche: Sorbet de fruta natural (s/ leite)","🌙 Jantar: Frango desfiado + macarrão de arroz + brócolis"]},
      {day:"Domingo",meals:["☀️ Café: Tapioca com ovo + abacate + suco","🌞 Almoço: Carne assada + batata + feijão + couve","🍎 Lanche: Frutas variadas + castanhas","🌙 Jantar: Sopa de feijão com legumes"]},
    ],
  },
  semGluten:{
    title:"Sem Glúten", icon:"🚫🌾", color:"#E07B39",
    tag:"Intolerância ao Glúten",
    description:"Para sensibilidade ao glúten não-celíaca. Exclui trigo, cevada e centeio com substitutos nutritivos.",
    alert:"⚠️ Diferente da doença celíaca, mas ainda exige atenção: evite trigo, aveia comum, cevada e centeio.",
    days:[
      {day:"Segunda",meals:["☀️ Café: Ovos mexidos + tapioca + suco de laranja","🌞 Almoço: Frango grelhado + arroz integral + feijão + salada","🍎 Lanche: Biscoito de arroz + pasta de amendoim + fruta","🌙 Jantar: Peixe + batata-doce + legumes grelhados"]},
      {day:"Terça",meals:["☀️ Café: Mingau de milho + banana + mel","🌞 Almoço: Carne bovina + arroz branco + lentilha + couve","🍎 Lanche: Iogurte + morango","🌙 Jantar: Omelete de legumes + mandioca cozida"]},
      {day:"Quarta",meals:["☀️ Café: Tapioca com queijo + abacate + suco","🌞 Almoço: Frango + quinoa + salada colorida + azeite","🍎 Lanche: Frutas + castanha","🌙 Jantar: Salmão + arroz integral + brócolis"]},
      {day:"Quinta",meals:["☀️ Café: Creme de arroz + ovo + suco","🌞 Almoço: Atum + batata-doce + cenoura + salada","🍎 Lanche: Iogurte grego + banana","🌙 Jantar: Sopa de feijão com legumes"]},
      {day:"Sexta",meals:["☀️ Café: Ovos cozidos + polenta + suco","🌞 Almoço: Peixe + cuscuz de milho + legumes","🍎 Lanche: Maçã + nozes","🌙 Jantar: Frango + arroz + salada leve"]},
      {day:"Sábado",meals:["☀️ Café: Panqueca de farinha de arroz + mel + fruta","🌞 Almoço: Carne assada + arroz + feijão + couve","🍎 Lanche: Smoothie de frutas naturais","🌙 Jantar: Omelete + batata-doce + salada"]},
      {day:"Domingo",meals:["☀️ Café: Tapioca de banana + ovo + suco","🌞 Almoço: Frango assado + polenta cremosa + legumes","🍎 Lanche: Frutas variadas + amendoim","🌙 Jantar: Sopa de lentilha com cenoura e espinafre"]},
    ],
  },
  diabeticos:{
    title:"Diabéticos", icon:"🩺", color:"#D4A017",
    tag:"Baixo IG",
    description:"Baixo índice glicêmico, controle rigoroso de carboidratos refinados, refeições fracionadas a cada 3h.",
    days:[
      {day:"Segunda",meals:["☀️ Café: 2 ovos cozidos + pão integral + chá s/ açúcar","🌞 Almoço: Frango + brócolis + arroz integral (50g cru)","🍎 Lanche: Iogurte natural s/ açúcar + 5 morangos","🌙 Jantar: Sopa de legumes com frango desfiado"]},
      {day:"Terça",meals:["☀️ Café: Aveia 40g + canela + maçã picada","🌞 Almoço: Peixe + salada verde + batata-doce pequena","🍎 Lanche: Nozes (30g) + pepino fatiado","🌙 Jantar: Omelete de legumes (abobrinha, pimentão, tomate)"]},
      {day:"Quarta",meals:["☀️ Café: Ovos mexidos + 1 fatia pão integral","🌞 Almoço: Frango + quinoa + salada + azeite","🍎 Lanche: Iogurte desnatado + castanha","🌙 Jantar: Salmão + espinafre + cenoura cozida"]},
      {day:"Quinta",meals:["☀️ Café: Tapioca pequena + ovo + chá","🌞 Almoço: Carne magra + arroz integral + lentilha + salada","🍎 Lanche: Pepino + hummus de grão-de-bico","🌙 Jantar: Sopa de feijão s/ farinha + couve"]},
      {day:"Sexta",meals:["☀️ Café: Omelete + pão integral (1 fatia)","🌞 Almoço: Atum + batata-doce + brócolis","🍎 Lanche: Maçã + amendoim (20g)","🌙 Jantar: Frango desfiado + arroz integral + salada"]},
      {day:"Sábado",meals:["☀️ Café: Ovos cozidos + iogurte s/ açúcar + fruta","🌞 Almoço: Peixe assado + arroz integral + legumes","🍎 Lanche: Morango + nozes","🌙 Jantar: Sopa de lentilha + cenoura + espinafre"]},
      {day:"Domingo",meals:["☀️ Café: Aveia com canela + ovos mexidos","🌞 Almoço: Frango + quinoa + salada colorida","🍎 Lanche: Iogurte natural + kiwi","🌙 Jantar: Omelete de legumes + salada leve"]},
    ],
  },
  adolescente:{
    title:"Adolescentes (15-17)", icon:"🧑‍🎓", color:"#7C5CBF",
    tag:"Crescimento",
    description:"Fase de crescimento: alta demanda de cálcio, ferro, zinco e energia. Cardápios práticos para a rotina escolar.",
    days:[
      {day:"Segunda",meals:["☀️ Café: Leite + pão integral com queijo + banana","🌞 Almoço: Frango + arroz + feijão + salada + suco","🍎 Lanche: Iogurte grego + morango + granola","🌙 Jantar: Omelete 2 ovos + macarrão integral + legumes"]},
      {day:"Terça",meals:["☀️ Café: Aveia com leite + maçã + mel","🌞 Almoço: Carne moída + arroz + feijão + cenoura","🍎 Lanche: Pão integral + pasta de amendoim + banana","🌙 Jantar: Sopa de lentilha + batata-doce + brócolis"]},
      {day:"Quarta",meals:["☀️ Café: Iogurte + granola + frutas","🌞 Almoço: Frango desfiado + macarrão + salada verde","🍎 Lanche: Leite + biscoito de arroz + queijo","🌙 Jantar: Arroz + feijão + ovo mexido + legumes"]},
      {day:"Quinta",meals:["☀️ Café: Tapioca com ovo + queijo + suco","🌞 Almoço: Peixe + arroz integral + feijão + salada","🍎 Lanche: Vitamina de leite + banana + aveia","🌙 Jantar: Frango + macarrão + brócolis"]},
      {day:"Sexta",meals:["☀️ Café: Leite + pão + ovo mexido","🌞 Almoço: Carne bovina + arroz + feijão + salada","🍎 Lanche: Iogurte + frutas + castanha","🌙 Jantar: Omelete + pão integral + salada"]},
      {day:"Sábado",meals:["☀️ Café: Panqueca de aveia + mel + fruta","🌞 Almoço: Frango assado + arroz + feijão + legumes","🍎 Lanche: Smoothie de frutas + leite","🌙 Jantar: Pizza integral caseira + salada"]},
      {day:"Domingo",meals:["☀️ Café: Ovos mexidos + pão integral + suco","🌞 Almoço: Filé de peixe + arroz + feijão + couve","🍎 Lanche: Frutas variadas + iogurte","🌙 Jantar: Macarrão integral com frango + molho de tomate"]},
    ],
  },
  idosos:{
    title:"Idosos (61+)", icon:"🧓", color:"#8DC63F",
    tag:"60+ anos",
    description:"Rica em cálcio, proteínas e vitamina D. Porções adequadas, fácil digestão e preparo simples.",
    days:[
      {day:"Segunda",meals:["☀️ Café: Iogurte integral + mamão + pão integral + chá","🌞 Almoço: Frango cozido desfiado + purê de batata-doce + cenoura","🍎 Lanche: Banana amassada + leite morno + aveia","🌙 Jantar: Sopa de feijão com legumes bem cozidos"]},
      {day:"Terça",meals:["☀️ Café: Leite + pão integral + queijo minas","🌞 Almoço: Peixe cozido + arroz + vagem + cenoura","🍎 Lanche: Frutas da época + iogurte","🌙 Jantar: Caldo de legumes com frango desfiado"]},
      {day:"Quarta",meals:["☀️ Café: Aveia + leite + banana amassada","🌞 Almoço: Omelete de legumes + arroz + salada cozida","🍎 Lanche: Iogurte + maçã cozida","🌙 Jantar: Sopa de lentilha + cenoura + batata"]},
      {day:"Quinta",meals:["☀️ Café: Mingau de aveia + leite + mel","🌞 Almoço: Frango + purê de batata + feijão + couve","🍎 Lanche: Mamão + iogurte","🌙 Jantar: Caldo de feijão com legumes + pão"]},
      {day:"Sexta",meals:["☀️ Café: Leite + pão + ovo cozido","🌞 Almoço: Peixe + arroz + legumes cozidos","🍎 Lanche: Banana + leite morno","🌙 Jantar: Sopa de legumes com frango"]},
      {day:"Sábado",meals:["☀️ Café: Iogurte + granola + fruta","🌞 Almoço: Frango assado desfiado + purê + cenoura","🍎 Lanche: Chá + biscoito de arroz","🌙 Jantar: Caldo de lentilha com legumes"]},
      {day:"Domingo",meals:["☀️ Café: Aveia + leite + mamão","🌞 Almoço: Carne cozida + arroz + feijão + couve","🍎 Lanche: Frutas + iogurte","🌙 Jantar: Sopa de feijão com batata e cenoura"]},
    ],
  },
  vegana:{
    title:"Vegana", icon:"🌱", color:"#8DC63F",
    tag:"Plant-Based",
    description:"100% plant-based. Atenção especial a B12, ferro, cálcio, ômega-3 e proteínas completas.",
    days:[
      {day:"Segunda",meals:["☀️ Café: Aveia + leite de amêndoas + banana + chia","🌞 Almoço: Lentilha + arroz integral + couve + tofu grelhado","🍎 Lanche: Abacate + torrada integral","🌙 Jantar: Grão-de-bico + quinoa + legumes assados"]},
      {day:"Terça",meals:["☀️ Café: Smoothie de banana + espinafre + leite de amêndoas","🌞 Almoço: Edamame + arroz + salada colorida + azeite","🍎 Lanche: Frutas + castanha-do-pará","🌙 Jantar: Sopa de feijão preto + brócolis + mandioca"]},
      {day:"Quarta",meals:["☀️ Café: Tapioca de banana + pasta de amendoim + suco","🌞 Almoço: Tofu grelhado + quinoa + legumes assados","🍎 Lanche: Maçã + nozes","🌙 Jantar: Lentilha + arroz integral + espinafre"]},
      {day:"Quinta",meals:["☀️ Café: Mingau de aveia com leite de coco + fruta","🌞 Almoço: Grão-de-bico temperado + arroz + salada + azeite","🍎 Lanche: Frutas variadas + castanha","🌙 Jantar: Sopa de lentilha + batata-doce + couve"]},
      {day:"Sexta",meals:["☀️ Café: Aveia + leite vegetal + banana + mel de abelha","🌞 Almoço: Feijão preto + arroz + tofu + cenoura","🍎 Lanche: Smoothie verde (espinafre + banana + leite vegetal)","🌙 Jantar: Edamame + quinoa + brócolis"]},
      {day:"Sábado",meals:["☀️ Café: Panqueca de aveia + banana + leite vegetal","🌞 Almoço: Feijoada vegana (leguminosas) + arroz + couve","🍎 Lanche: Frutas + pasta de amendoim","🌙 Jantar: Tofu + macarrão de arroz + legumes"]},
      {day:"Domingo",meals:["☀️ Café: Vitamina de frutas + leite vegetal + chia","🌞 Almoço: Lentilha + quinoa + legumes grelhados","🍎 Lanche: Abacate + biscoito de arroz","🌙 Jantar: Sopa de grão-de-bico com espinafre e batata"]},
    ],
  },
};

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
const QUIZ=[
  {id:1,q:"Qual é seu principal objetivo?",opts:["Emagrecer","Ganhar massa muscular","Manter peso saudável","Controlar condição de saúde"]},
  {id:2,q:"Com que frequência você pratica atividade física?",opts:["Sedentário","Leve (1-2x/semana)","Moderado (3-4x/semana)","Intenso (5+x/semana)"]},
  {id:3,q:"Você tem alguma restrição alimentar?",opts:["Nenhuma","Vegetariano","Vegano","Celíaco (doença celíaca)","Intolerante à lactose","Sensível ao glúten (não celíaco)","Diabético / doença metabólica"]},
  {id:4,q:"Quantas refeições por dia?",opts:["1-2","3","4-5","6 ou mais"]},
  {id:5,q:"Como é sua rotina?",opts:["Trabalho em casa","Fora / tenho tempo p/ cozinhar","Fora / pouco tempo","Muito agitado, como fora sempre"]},
  {id:6,q:"Faixa etária?",opts:["13-17 anos","18-25 anos","26-40 anos","41-60 anos","61+ anos"]},
  {id:7,q:"Qual é o seu gênero?",opts:["Masculino","Feminino","Prefiro não informar"]},
  {id:8,q:"Qual é o seu peso atual?",type:"number",unit:"kg",placeholder:"Ex: 70",min:30,max:250},
  {id:9,q:"Qual é a sua altura?",type:"number",unit:"cm",placeholder:"Ex: 170",min:100,max:250},
];

const BADGES=[
  {id:"quiz",name:"Autoconhecimento",icon:"🧠",desc:"Completou o questionário",xp:100},
  {id:"firstMeal",name:"Primeiro Passo",icon:"🌱",desc:"Registrou a primeira refeição",xp:50},
  {id:"hydrated",name:"Hidratado",icon:"💧",desc:"Bebeu 2L de água num dia",xp:100},
  {id:"protein",name:"Rei das Proteínas",icon:"💪",desc:"Atingiu meta de proteína",xp:150},
  {id:"veggies",name:"Amigo das Verduras",icon:"🥦",desc:"Registrou verduras 7x",xp:100},
  {id:"explorer",name:"Explorador Nutri",icon:"🔍",desc:"Pesquisou 20 alimentos",xp:75},
  {id:"goalWin",name:"Meta Batida!",icon:"🏆",desc:"Completou uma meta semanal",xp:300},
  {id:"week1",name:"Uma Semana!",icon:"📅",desc:"7 dias seguidos com registro",xp:200},
  {id:"custom",name:"Chef Personalizado",icon:"👨‍🍳",desc:"Criou sua primeira dieta personalizada",xp:150},
];

function getDietRec(ans){
  if(ans[6]==="13-17 anos") return "adolescente";
  if(ans[6]==="61+ anos") return "idosos";
  if(ans[3]==="Vegano") return "vegana";
  if(ans[3]==="Vegetariano") return "vegetariana";
  if(ans[3]==="Celíaco (doença celíaca)") return "celiaca";
  if(ans[3]==="Intolerante à lactose") return "intoleranciaLactose";
  if(ans[3]==="Sensível ao glúten (não celíaco)") return "semGluten";
  if(ans[3]==="Diabético / doença metabólica") return "diabeticos";
  if(ans[1]==="Ganhar massa muscular") return "hipertrofia";
  return "emagrecimento";
}

// Harris-Benedict (Mifflin-St Jeor revision) + activity factor
function calcGoals(ans){
  const peso   = parseFloat(ans[8]) || 70;
  const altura = parseFloat(ans[9]) || 170;
  const genero = ans[7] || "Prefiro não informar";
  const faixa  = ans[6] || "26-40 anos";
  const atividade = ans[2] || "Sedentário";
  const objetivo  = ans[1] || "Manter peso saudável";

  // Estimate age midpoint from range
  const ageMap={"13-17 anos":15,"18-25 anos":22,"26-40 anos":33,"41-60 anos":50,"61+ anos":67};
  const idade = ageMap[faixa] || 30;

  // TMB Mifflin-St Jeor
  let tmb;
  if(genero==="Masculino"){
    tmb = (10*peso)+(6.25*altura)-(5*idade)+5;
  } else if(genero==="Feminino"){
    tmb = (10*peso)+(6.25*altura)-(5*idade)-161;
  } else {
    // Average of both when not informed
    const m=(10*peso)+(6.25*altura)-(5*idade)+5;
    const f=(10*peso)+(6.25*altura)-(5*idade)-161;
    tmb=(m+f)/2;
  }

  // Activity factor
  const fa={"Sedentário":1.2,"Leve (1-2x/semana)":1.375,"Moderado (3-4x/semana)":1.55,"Intenso (5+x/semana)":1.725};
  const fator = fa[atividade] || 1.2;
  let tdee = Math.round(tmb * fator);

  // Adjust for goal
  if(objetivo==="Emagrecer") tdee = Math.round(tdee*0.82);            // ~18% deficit
  else if(objetivo==="Ganhar massa muscular") tdee = Math.round(tdee*1.12); // ~12% surplus
  // else manter / controlar => keep tdee

  // Protein target: 1.6g/kg emagrecer/manter, 2.0g/kg hipertrofia, 1.2g/kg others
  const protFactor = objetivo==="Ganhar massa muscular"?2.0: objetivo==="Emagrecer"?1.8:1.5;
  const prot = Math.round(peso * protFactor);

  // Carb and fat from remaining calories
  const protCal = prot*4;
  const remaining = tdee - protCal;
  const fat  = Math.round((remaining*0.28)/9);
  const carb = Math.round((remaining*0.72)/4);

  // Water: 35ml/kg bodyweight, expressed in 250ml glasses
  const water = Math.max(6, Math.round((peso*35)/250));

  return {cal:tdee, prot, carb, fat, water};
}

function getLvl(xp){const level=Math.floor(xp/200)+1;return{level,cur:xp%200,max:200};}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Bar({val,max,color=C.green,h=8}){
  const pct=Math.min(100,(val/max)*100);
  return(
    <div style={{background:C.border,borderRadius:99,height:h,overflow:"hidden"}}>
      <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${color}aa,${color})`,borderRadius:99,transition:"width .5s ease"}}/>
    </div>
  );
}
function MacroChip({label,val,max,color}){
  const pct=Math.min(100,(val/max)*100);const r=22;const circ=2*Math.PI*r;
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
      <svg width="58" height="58">
        <circle cx="29" cy="29" r={r} fill="none" stroke={C.border} strokeWidth="5"/>
        <circle cx="29" cy="29" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${(pct/100)*circ} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 29 29)" style={{transition:"stroke-dasharray .5s"}}/>
        <text x="29" y="33" textAnchor="middle" fill={C.text} fontSize="11" fontWeight="700">{val}g</text>
      </svg>
      <span style={{fontSize:10,color:C.textMuted,fontWeight:600}}>{label}</span>
    </div>
  );
}
function Logo({size=42}){
  return(
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 40 C24 30 22 24 18 18" stroke="#3A8C4E" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M18 18 C10 12 8 4 16 6 C20 7 22 14 18 18Z" fill="#3A8C4E"/>
      <path d="M18 18 C26 10 34 8 30 16 C28 20 20 22 18 18Z" fill="#72BF7A"/>
      <path d="M22 28 C26 22 32 22 30 27 C28 30 22 30 22 28Z" fill="#8DC63F"/>
      <path d="M16 7 C16 11 17 14 18 18" stroke="#245E33" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <ellipse cx="24" cy="41" rx="7" ry="2.5" fill="#C0D9A8" opacity="0.7"/>
      <circle cx="33" cy="10" r="2.5" fill="#3B82C4" opacity="0.7"/>
      <path d="M33 7 C33 7 31 10 33 10 C35 10 33 7 33 7Z" fill="#3B82C4" opacity="0.5"/>
    </svg>
  );
}

// ─── CUSTOM DIET BUILDER ──────────────────────────────────────────────────────
const MEAL_SLOTS=["☀️ Café da Manhã","🌞 Almoço","🍎 Lanche","🌙 Jantar"];
function buildEmptyWeek(){
  return WEEK.map(day=>({day,meals:MEAL_SLOTS.map(()=>"")}));
}

function CustomDietBuilder({onSave,onCancel}){
  const [name,setName]=useState("");
  const [week,setWeek]=useState(buildEmptyWeek());
  const [activeDay,setActiveDay]=useState(0);

  function updateMeal(dayIdx,mealIdx,val){
    setWeek(w=>{const n=[...w];n[dayIdx]={...n[dayIdx],meals:[...n[dayIdx].meals]};n[dayIdx].meals[mealIdx]=val;return n;});
  }
  function handleSave(){
    if(!name.trim()){alert("Dê um nome à sua dieta!");return;}
    onSave({key:"custom_"+Date.now(),title:name,icon:"👨‍🍳",color:C.green,tag:"Personalizada",description:"Dieta criada por você.",days:week.map(d=>({day:d.day,meals:d.meals.map((m,i)=>m?`${MEAL_SLOTS[i].split(" ")[0]} ${MEAL_SLOTS[i].split(" ").slice(1).join(" ")}: ${m}`:null).filter(Boolean)}))});
  }
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onCancel} style={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:10,padding:"6px 12px",cursor:"pointer",fontWeight:700,color:C.textMid,fontSize:13}}>← Voltar</button>
        <h2 style={{margin:0,fontSize:18,fontWeight:800}}>👨‍🍳 Criar Minha Dieta</h2>
      </div>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome da sua dieta (ex: Minha Dieta Fit)"
        style={{background:C.card,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"12px 14px",fontSize:15,color:C.text,width:"100%",boxSizing:"border-box"}}/>
      <p style={{margin:0,fontSize:12,color:C.textMuted}}>Selecione o dia e preencha suas refeições:</p>

      {/* Day tabs */}
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
        {WEEK.map((d,i)=>(
          <button key={d} onClick={()=>setActiveDay(i)}
            style={{background:activeDay===i?C.green:C.card,color:activeDay===i?"#fff":C.textMid,border:`1.5px solid ${activeDay===i?C.green:C.border}`,borderRadius:10,padding:"7px 12px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
            {d.slice(0,3)}
            {week[i].meals.filter(m=>m.trim()).length>0 && <span style={{marginLeft:4,background:"#fff3",borderRadius:"50%",padding:"1px 4px",fontSize:10}}>✓</span>}
          </button>
        ))}
      </div>

      {/* Meal inputs for active day */}
      <div style={{background:C.card,borderRadius:16,padding:18,border:`1px solid ${C.border}`,display:"flex",flexDirection:"column",gap:14}}>
        <p style={{margin:0,fontWeight:800,color:C.green,fontSize:15}}>{WEEK[activeDay]}</p>
        {MEAL_SLOTS.map((slot,mi)=>(
          <div key={slot}>
            <p style={{margin:"0 0 5px",fontSize:12,fontWeight:700,color:C.textMuted}}>{slot}</p>
            <input value={week[activeDay].meals[mi]} onChange={e=>updateMeal(activeDay,mi,e.target.value)}
              placeholder={`Ex: Arroz + frango + salada`}
              style={{background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 12px",fontSize:13,color:C.text,width:"100%",boxSizing:"border-box"}}/>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div style={{background:C.cardAlt,borderRadius:12,padding:12,border:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:12,color:C.textMid,fontWeight:700}}>Dias preenchidos</span>
          <span style={{fontSize:12,color:C.green,fontWeight:800}}>{week.filter(d=>d.meals.some(m=>m.trim())).length}/7</span>
        </div>
        <Bar val={week.filter(d=>d.meals.some(m=>m.trim())).length} max={7}/>
      </div>

      <button onClick={handleSave}
        style={{background:`linear-gradient(135deg,${C.green},${C.lime})`,color:"#fff",border:"none",borderRadius:14,padding:"15px",fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:`0 4px 18px ${C.green}30`}}>
        💾 Salvar Minha Dieta
      </button>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function NutriTec(){
  const [screen,setScreen]=useState("splash");
  const [tab,setTab]=useState("home");
  const [quizStep,setQuizStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [recDiet,setRecDiet]=useState(null);

  const [xp,setXp]=useState(0);
  const [badges,setBadges]=useState([]);
  const [xpPop,setXpPop]=useState(null);

  const [water,setWater]=useState(0);
  const [meals,setMeals]=useState([]);
  const [search,setSearch]=useState("");
  const [results,setResults]=useState([]);
  const [catTab,setCatTab]=useState("proteinas");
  const [dietTab,setDietTab]=useState("emagrecimento");
  const [selectedDay,setSelectedDay]=useState(0);

  // Custom diet state
  const [showBuilder,setShowBuilder]=useState(false);
  const [customDiets,setCustomDiets]=useState([]);
  const [viewingCustom,setViewingCustom]=useState(null);

  const [userGoals,setUserGoals]=useState(null); // set after quiz

  const weekG={daysLogged:7,workouts:4,waterStreak:5};
  const weekP={daysLogged:0,workouts:0,waterStreak:0};
  const monthG={daysActive:20};const monthP={daysActive:0};

  // Use calculated goals if available, otherwise sensible defaults
  const goals = userGoals || {cal:2000,prot:120,carb:250,fat:65,water:8};

  const totCal=meals.reduce((a,m)=>a+m.cal,0);
  const totProt=Math.round(meals.reduce((a,m)=>a+m.prot,0));
  const totCarb=Math.round(meals.reduce((a,m)=>a+m.carb,0));
  const totFat=Math.round(meals.reduce((a,m)=>a+m.fat,0));
  const {level,cur,max}=getLvl(xp);

  function popXP(n,msg){setXp(p=>p+n);setXpPop(msg);setTimeout(()=>setXpPop(null),1800);}
  function doSearch(q){
    setSearch(q);
    if(!q.trim()){setResults([]);return;}
    const all=Object.values(FOOD_DB).flat();
    setResults(all.filter(f=>f.name.toLowerCase().includes(q.toLowerCase())).slice(0,10));
  }
  function logFood(f){
    setMeals(p=>[...p,f]);
    popXP(XP_MEAL,`+${XP_MEAL} XP — ${f.name}!`);
    if(!badges.includes("firstMeal"))setBadges(p=>[...p,"firstMeal"]);
  }
  function addWater(){if(water<10){setWater(p=>p+1);popXP(XP_WATER,`+${XP_WATER} XP — Hidratado! 💧`);if(!badges.includes("hydrated")&&water+1>=8)setBadges(p=>[...p,"hydrated"]);}}
  function finishQuiz(){
    const rec=getDietRec(answers);
    const computed=calcGoals(answers);
    setRecDiet(rec);
    setUserGoals(computed);
    if(!badges.includes("quiz"))setBadges(p=>[...p,"quiz"]);
    popXP(100,"🎉 +100 XP — Perfil completo!");
    setScreen("app");setTab("dietas");setDietTab(rec);
  }
  function saveCustomDiet(diet){
    setCustomDiets(p=>[...p,diet]);
    if(!badges.includes("custom"))setBadges(p=>[...p,"custom"]);
    popXP(150,"👨‍🍳 +150 XP — Dieta criada!");
    setShowBuilder(false);setDietTab(diet.key);
  }

  const CAT_META={proteinas:{icon:"🥩",label:"Proteínas"},carboidratos:{icon:"🌾",label:"Carboidratos"},vegetais:{icon:"🥦",label:"Vegetais"},frutas:{icon:"🍎",label:"Frutas"},gordurasBoas:{icon:"🥑",label:"Gorduras"},laticinios:{icon:"🥛",label:"Laticínios"}};
  const NAV=[{id:"home",icon:"🏠",lbl:"Início"},{id:"alimentos",icon:"🔍",lbl:"Alimentos"},{id:"dietas",icon:"📋",lbl:"Dietas"},{id:"metas",icon:"🎯",lbl:"Metas"},{id:"perfil",icon:"🏆",lbl:"Perfil"}];

  const allDiets={...DIET_SUGGESTIONS,...Object.fromEntries(customDiets.map(d=>[d.key,d]))};
  const activeDiet=allDiets[dietTab];

  // ── SPLASH ──────────────────────────────────────────────────────────────────
  if(screen==="splash") return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#EEF7E8 0%,#D5EDCA 50%,#C3E5B5 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Segoe UI',sans-serif",padding:32,gap:24}}>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
      <div style={{animation:"float 3s ease-in-out infinite"}}><Logo size={80}/></div>
      <div style={{textAlign:"center"}}>
        <h1 style={{fontSize:46,fontWeight:900,color:C.greenDark,margin:0,letterSpacing:-1}}>NutriTec</h1>
        <p style={{color:C.green,fontSize:13,letterSpacing:3,textTransform:"uppercase",margin:"6px 0 0"}}>Sua dieta, seu jogo</p>
      </div>
      <p style={{color:C.textMid,textAlign:"center",maxWidth:280,fontSize:14,lineHeight:1.7,margin:0}}>
        Alimentação saudável e acessível com planos personalizados, gamificação e metas para cada estilo de vida.
      </p>
      <button onClick={()=>setScreen("quiz")} style={{background:`linear-gradient(135deg,${C.green},${C.lime})`,color:"#fff",border:"none",borderRadius:18,padding:"16px 52px",fontSize:17,fontWeight:800,cursor:"pointer",boxShadow:`0 8px 28px ${C.green}50`}}>
        Começar Agora 🚀
      </button>
    </div>
  );

  // ── QUIZ ────────────────────────────────────────────────────────────────────
  if(screen==="quiz"){
    if(quizStep>=QUIZ.length){finishQuiz();return null;}
    const q=QUIZ[quizStep];
    const isNumber = q.type==="number";
    const numVal = answers[q.id]||"";

    return(
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#F0F7EA,#E0F0D5)",fontFamily:"'Segoe UI',sans-serif",padding:"28px 20px 40px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {QUIZ.map((_,i)=><div key={i} style={{height:5,width:22,borderRadius:99,background:i<=quizStep?C.green:C.border}}/>)}
          </div>
          <span style={{color:C.textMuted,fontSize:13}}>{quizStep+1}/{QUIZ.length}</span>
        </div>
        <Logo size={36}/>
        <p style={{color:C.textMuted,fontSize:12,textTransform:"uppercase",letterSpacing:2,margin:"16px 0 4px"}}>Pergunta {quizStep+1}</p>
        <h2 style={{color:C.text,fontSize:21,fontWeight:800,lineHeight:1.3,margin:"0 0 28px"}}>{q.q}</h2>

        {isNumber ? (
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{position:"relative"}}>
              <input
                type="number" inputMode="decimal"
                value={numVal}
                onChange={e=>setAnswers(p=>({...p,[q.id]:e.target.value}))}
                placeholder={q.placeholder}
                min={q.min} max={q.max}
                style={{background:C.card,border:`2px solid ${numVal?C.green:C.border}`,borderRadius:16,padding:"18px 60px 18px 20px",fontSize:22,fontWeight:700,color:C.text,width:"100%",boxSizing:"border-box",boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}
              />
              <span style={{position:"absolute",right:18,top:"50%",transform:"translateY(-50%)",color:C.green,fontWeight:800,fontSize:16}}>{q.unit}</span>
            </div>
            {numVal && (
              <div style={{background:C.cardAlt,borderRadius:12,padding:"10px 16px",border:`1px solid ${C.border}`}}>
                <p style={{margin:0,fontSize:13,color:C.textMid}}>
                  {q.id===8 ? `⚖️ Peso registrado: ${numVal} kg` : `📏 Altura registrada: ${numVal} cm`}
                </p>
              </div>
            )}
            <button
              onClick={()=>{
                const v=parseFloat(numVal);
                if(!numVal||isNaN(v)||v<q.min||v>q.max){
                  alert(`Por favor, insira um valor entre ${q.min} e ${q.max} ${q.unit}.`);return;
                }
                setQuizStep(s=>s+1);
              }}
              style={{background:numVal?`linear-gradient(135deg,${C.green},${C.lime})`:"#ccc",color:"#fff",border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:800,cursor:numVal?"pointer":"not-allowed",boxShadow:numVal?`0 4px 18px ${C.green}30`:"none"}}>
              Continuar →
            </button>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {q.opts.map(o=>(
              <button key={o} onClick={()=>{setAnswers(p=>({...p,[q.id]:o}));setQuizStep(s=>s+1);}}
                style={{background:answers[q.id]===o?C.green:C.card,color:answers[q.id]===o?"#fff":C.text,border:`1.5px solid ${answers[q.id]===o?C.green:C.border}`,borderRadius:14,padding:"15px 18px",fontSize:15,fontWeight:600,cursor:"pointer",textAlign:"left",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── APP ─────────────────────────────────────────────────────────────────────
  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',sans-serif",color:C.text,maxWidth:480,margin:"0 auto",position:"relative"}}>
      <style>{`
        @keyframes fadeUp{0%{opacity:0;transform:translateX(-50%) translateY(8px)}20%{opacity:1;transform:translateX(-50%) translateY(0)}80%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-18px)}}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.greenLight};border-radius:99px}
        input:focus,textarea:focus{outline:none}
      `}</style>

      {xpPop&&<div style={{position:"fixed",top:62,left:"50%",transform:"translateX(-50%)",background:C.green,color:"#fff",borderRadius:99,padding:"7px 18px",fontWeight:800,fontSize:13,zIndex:9999,boxShadow:`0 4px 18px ${C.green}60`,animation:"fadeUp 1.8s ease forwards",whiteSpace:"nowrap"}}>{xpPop}</div>}

      {/* HEADER */}
      <div style={{background:C.card,padding:"14px 18px 10px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1.5px solid ${C.border}`,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(58,140,78,.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Logo size={38}/>
          <div>
            <span style={{fontSize:20,fontWeight:900,color:C.greenDark,letterSpacing:-0.5}}>NutriTec</span>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
              <span style={{fontSize:11,color:C.green,fontWeight:700}}>Nível {level}</span>
              <div style={{width:64}}><Bar val={cur} max={max} h={4}/></div>
              <span style={{fontSize:10,color:C.textMuted}}>{cur}/{max}</span>
            </div>
          </div>
        </div>
        <div style={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:12,padding:"5px 12px",display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:14}}>⚡</span>
          <span style={{fontWeight:800,color:C.accent,fontSize:15}}>{xp}</span>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{padding:"16px 16px 100px",overflowY:"auto"}}>

        {/* ── HOME ── */}
        {tab==="home"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:`linear-gradient(135deg,${C.green},${C.lime})`,borderRadius:22,padding:"22px 22px 18px",boxShadow:`0 6px 24px ${C.green}30`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <p style={{color:"#ffffffbb",fontSize:11,textTransform:"uppercase",letterSpacing:2,margin:0}}>Hoje</p>
                  <h2 style={{fontSize:38,fontWeight:900,color:"#fff",margin:"4px 0 2px",lineHeight:1}}>{totCal} <span style={{fontSize:16,fontWeight:500}}>kcal</span></h2>
                  <p style={{color:"#ffffffaa",fontSize:13,margin:0}}>Meta: {goals.cal} kcal {userGoals?"· personalizada":""}</p>
                </div>
                <div style={{background:"rgba(255,255,255,0.25)",borderRadius:14,padding:"10px 16px",textAlign:"center"}}>
                  <div style={{fontSize:22,fontWeight:900,color:"#fff"}}>{Math.max(0,goals.cal-totCal)}</div>
                  <div style={{fontSize:10,color:"#ffffffcc"}}>restantes</div>
                </div>
              </div>
              <div style={{marginTop:14}}><Bar val={totCal} max={goals.cal} color="#fff" h={8}/></div>
            </div>

            <div style={{background:C.card,borderRadius:18,padding:18,border:`1px solid ${C.border}`,boxShadow:"0 2px 10px rgba(0,0,0,.04)"}}>
              <h3 style={{margin:"0 0 14px",fontSize:14,color:C.textMuted,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Macronutrientes</h3>
              <div style={{display:"flex",justifyContent:"space-around"}}>
                <MacroChip label="Proteína" val={totProt} max={goals.prot} color="#3B82C4"/>
                <MacroChip label="Carbo" val={totCarb} max={goals.carb||250} color={C.accent}/>
                <MacroChip label="Gordura" val={totFat} max={goals.fat||65} color={C.lime}/>
              </div>
            </div>

            <div style={{background:C.card,borderRadius:18,padding:18,border:`1px solid ${C.border}`,boxShadow:"0 2px 10px rgba(0,0,0,.04)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <h3 style={{margin:0,fontSize:15,fontWeight:700}}>💧 Hidratação</h3>
                <span style={{color:C.blue,fontWeight:700,fontSize:13}}>{water}/{goals.water} copos</span>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
                {Array.from({length:Math.min(goals.water,10)}).map((_,i)=>(
                  <div key={i} onClick={i===water?addWater:undefined} style={{width:36,height:36,borderRadius:10,border:`2px solid ${i<water?C.blue:C.border}`,background:i<water?C.blueLight:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:i===water?"pointer":"default",transition:"all .2s"}}>
                    {i<water?"💧":"○"}
                  </div>
                ))}
              </div>
              <button onClick={addWater} style={{width:"100%",background:C.blueLight,border:`1px solid ${C.blue}40`,borderRadius:12,padding:"10px",color:C.blue,fontWeight:700,cursor:"pointer",fontSize:13}}>
                + Adicionar copo de água
              </button>
            </div>

            <div style={{background:C.card,borderRadius:18,padding:18,border:`1px solid ${C.border}`,boxShadow:"0 2px 10px rgba(0,0,0,.04)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <h3 style={{margin:0,fontSize:15,fontWeight:700}}>🍽️ Refeições de hoje</h3>
                <button onClick={()=>setTab("alimentos")} style={{background:C.green,border:"none",borderRadius:8,padding:"5px 14px",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>+ Adicionar</button>
              </div>
              {meals.length===0
                ?<div style={{textAlign:"center",padding:"20px 0"}}>
                  <div style={{fontSize:36,marginBottom:8}}>🍽️</div>
                  <p style={{margin:0,color:C.textMuted,fontSize:14}}>Nenhuma refeição registrada hoje.</p>
                  <p style={{margin:"4px 0 0",color:C.textMuted,fontSize:12}}>Vá em Alimentos para começar!</p>
                </div>
                :meals.map((m,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<meals.length-1?`1px solid ${C.border}`:"none"}}>
                    <span style={{fontSize:14,fontWeight:600}}>{m.name}</span>
                    <span style={{fontSize:13,color:C.green,fontWeight:800}}>{m.cal} kcal</span>
                  </div>
                ))
              }
            </div>

            {recDiet&&(
              <div onClick={()=>setTab("dietas")} style={{background:C.cardAlt,borderRadius:16,padding:16,border:`1.5px solid ${C.green}50`,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:28}}>{DIET_SUGGESTIONS[recDiet]?.icon||"🍽️"}</span>
                <div>
                  <p style={{margin:0,fontSize:11,color:C.green,fontWeight:800,textTransform:"uppercase",letterSpacing:1}}>Seu plano recomendado</p>
                  <p style={{margin:"2px 0 0",fontSize:14,fontWeight:800,color:C.greenDark}}>{allDiets[recDiet]?.title}</p>
                </div>
                <span style={{marginLeft:"auto",color:C.textMuted}}>→</span>
              </div>
            )}

            <div style={{background:"linear-gradient(135deg,#FFF8EC,#FFF3DC)",borderRadius:16,padding:16,border:"1px solid #F0D080"}}>
              <p style={{margin:"0 0 5px",color:C.accentYel,fontWeight:800,fontSize:13}}>💡 Dica do dia</p>
              <p style={{margin:0,color:C.textMid,fontSize:13,lineHeight:1.6}}>Inclua proteína em cada refeição principal para aumentar saciedade e preservar massa muscular.</p>
            </div>
          </div>
        )}

        {/* ── ALIMENTOS ── */}
        {tab==="alimentos"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <h2 style={{margin:0,fontSize:20,fontWeight:800}}>🔍 Tabela Nutricional</h2>
            <input value={search} onChange={e=>doSearch(e.target.value)} placeholder="Buscar alimento..."
              style={{background:C.card,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"12px 16px",color:C.text,fontSize:15,width:"100%",boxSizing:"border-box",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}/>
            {results.length>0&&(
              <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.06)"}}>
                <p style={{margin:"10px 14px 6px",fontSize:11,color:C.textMuted,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Resultados</p>
                {results.map((f,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",borderBottom:i<results.length-1?`1px solid ${C.border}`:"none"}}>
                    <div>
                      <p style={{margin:0,fontWeight:700,fontSize:14}}>{f.name}</p>
                      <p style={{margin:"2px 0 0",fontSize:11,color:C.textMuted}}>{f.portion} · P:{f.prot}g C:{f.carb}g G:{f.fat}g</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{color:C.green,fontWeight:800,fontSize:14}}>{f.cal} kcal</span>
                      <button onClick={()=>logFood(f)} style={{background:C.green,border:"none",borderRadius:8,padding:"6px 12px",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:12}}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
              {Object.entries(CAT_META).map(([key,{icon,label}])=>(
                <button key={key} onClick={()=>setCatTab(key)}
                  style={{background:catTab===key?C.green:C.card,color:catTab===key?"#fff":C.textMid,border:`1.5px solid ${catTab===key?C.green:C.border}`,borderRadius:12,padding:"8px 14px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",boxShadow:catTab===key?`0 3px 12px ${C.green}40`:"none"}}>
                  {icon} {label}
                </button>
              ))}
            </div>
            <p style={{margin:0,fontSize:12,color:C.textMuted}}>{FOOD_DB[catTab]?.length} alimentos</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {(FOOD_DB[catTab]||[]).map((f,i)=>(
                <div key={i} style={{background:C.card,borderRadius:14,padding:"14px 16px",border:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 1px 6px rgba(0,0,0,.04)"}}>
                  <div style={{flex:1}}>
                    <p style={{margin:0,fontWeight:700,fontSize:14}}>{f.name}</p>
                    <p style={{margin:"3px 0 0",fontSize:11,color:C.textMuted}}>{f.portion}</p>
                    <div style={{display:"flex",gap:8,marginTop:6}}>
                      {[["P",f.prot,"#3B82C4"],["C",f.carb,C.accent],["G",f.fat,C.lime]].map(([l,v,col])=>(
                        <span key={l} style={{fontSize:11,fontWeight:700,background:`${col}18`,color:col,padding:"2px 7px",borderRadius:6}}>{l}:{v}g</span>
                      ))}
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,marginLeft:10}}>
                    <span style={{color:C.green,fontWeight:900,fontSize:18}}>{f.cal}</span>
                    <span style={{color:C.textMuted,fontSize:10,marginTop:-4}}>kcal</span>
                    <button onClick={()=>logFood(f)} style={{background:C.cardAlt,border:`1.5px solid ${C.green}`,borderRadius:9,padding:"5px 12px",color:C.green,fontWeight:800,cursor:"pointer",fontSize:12}}>+ Log</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DIETAS ── */}
        {tab==="dietas"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {showBuilder
              ? <CustomDietBuilder onSave={saveCustomDiet} onCancel={()=>setShowBuilder(false)}/>
              : viewingCustom
              ? (() => {
                  const d=viewingCustom;
                  return(
                    <div style={{display:"flex",flexDirection:"column",gap:14}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <button onClick={()=>setViewingCustom(null)} style={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:10,padding:"6px 12px",cursor:"pointer",fontWeight:700,color:C.textMid,fontSize:13}}>← Voltar</button>
                        <h2 style={{margin:0,fontSize:18,fontWeight:800}}>{d.icon} {d.title}</h2>
                      </div>
                      {d.days.map((day,i)=>(
                        <div key={i} style={{background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.border}`}}>
                          <p style={{margin:"0 0 10px",fontWeight:800,color:d.color,fontSize:14}}>📅 {day.day}</p>
                          {day.meals.length===0
                            ?<p style={{margin:0,color:C.textMuted,fontSize:13}}>Nenhuma refeição cadastrada.</p>
                            :day.meals.map((m,j)=><div key={j} style={{padding:"8px 0",borderBottom:j<day.meals.length-1?`1px dashed ${C.border}`:"none"}}><p style={{margin:0,fontSize:13,color:C.text}}>{m}</p></div>)
                          }
                        </div>
                      ))}
                    </div>
                  );
                })()
              :(
                <>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h2 style={{margin:0,fontSize:20,fontWeight:800}}>📋 Planos Alimentares</h2>
                    <button onClick={()=>setShowBuilder(true)} style={{background:`linear-gradient(135deg,${C.green},${C.lime})`,color:"#fff",border:"none",borderRadius:12,padding:"8px 14px",fontSize:13,fontWeight:800,cursor:"pointer",boxShadow:`0 3px 12px ${C.green}30`}}>
                      + Criar
                    </button>
                  </div>

                  {recDiet&&(
                    <div style={{background:`linear-gradient(135deg,${C.cardAlt},#D4EDDA)`,borderRadius:14,padding:14,border:`1.5px solid ${C.green}50`,display:"flex",alignItems:"center",gap:12}}>
                      <span style={{fontSize:24}}>{allDiets[recDiet]?.icon}</span>
                      <div>
                        <p style={{margin:0,fontSize:11,color:C.green,fontWeight:800,textTransform:"uppercase",letterSpacing:1}}>✨ Recomendado para você</p>
                        <p style={{margin:"2px 0 0",fontSize:14,fontWeight:800,color:C.greenDark}}>{allDiets[recDiet]?.title}</p>
                      </div>
                    </div>
                  )}

                  {/* Category groups */}
                  {[
                    {label:"🍽️ Objetivos",keys:["emagrecimento","hipertrofia"]},
                    {label:"🌿 Estilo de Vida",keys:["vegetariana","vegana","adolescente","idosos"]},
                    {label:"🏥 Necessidades Especiais",keys:["celiaca","intoleranciaLactose","semGluten","diabeticos"]},
                    ...(customDiets.length>0?[{label:"👨‍🍳 Minhas Dietas",keys:customDiets.map(d=>d.key)}]:[]),
                  ].map(group=>(
                    <div key={group.label}>
                      <p style={{margin:"4px 0 8px",fontSize:12,fontWeight:800,color:C.textMuted,textTransform:"uppercase",letterSpacing:1}}>{group.label}</p>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        {group.keys.map(k=>{
                          const d=allDiets[k];if(!d)return null;
                          const isCustom=customDiets.some(c=>c.key===k);
                          return(
                            <button key={k} onClick={()=>{if(isCustom){setViewingCustom(d);}else{setDietTab(k);}}}
                              style={{background:dietTab===k&&!isCustom?d.color:C.card,color:dietTab===k&&!isCustom?"#fff":C.text,border:`1.5px solid ${dietTab===k&&!isCustom?d.color:C.border}`,borderRadius:14,padding:"14px 12px",cursor:"pointer",textAlign:"left",boxShadow:dietTab===k&&!isCustom?`0 4px 14px ${d.color}40`:"0 1px 6px rgba(0,0,0,.04)",transition:"all .2s"}}>
                              <div style={{fontSize:24,marginBottom:6}}>{d.icon}</div>
                              <p style={{margin:0,fontWeight:800,fontSize:13,lineHeight:1.3}}>{d.title}</p>
                              <p style={{margin:"4px 0 0",fontSize:11,opacity:0.7,fontWeight:600,background:dietTab===k&&!isCustom?"rgba(255,255,255,0.2)":d.color+"20",borderRadius:6,padding:"2px 6px",display:"inline-block",color:dietTab===k&&!isCustom?"#fff":d.color}}>{d.tag}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Active diet detail */}
                  {activeDiet&&!customDiets.some(c=>c.key===dietTab)&&(
                    <div style={{marginTop:8}}>
                      <div style={{background:C.card,borderRadius:18,padding:20,border:`1.5px solid ${activeDiet.color}40`,boxShadow:"0 3px 14px rgba(0,0,0,.06)",marginBottom:14}}>
                        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                          <span style={{fontSize:32}}>{activeDiet.icon}</span>
                          <h3 style={{margin:0,color:activeDiet.color,fontSize:18,fontWeight:800}}>{activeDiet.title}</h3>
                        </div>
                        {activeDiet.alert&&(
                          <div style={{background:"#FFF3E0",borderRadius:10,padding:"10px 12px",border:"1px solid #FFB74D",marginBottom:10}}>
                            <p style={{margin:0,fontSize:12,color:"#E65100",fontWeight:700,lineHeight:1.5}}>{activeDiet.alert}</p>
                          </div>
                        )}
                        <p style={{margin:0,color:C.textMid,fontSize:13,lineHeight:1.7}}>{activeDiet.description}</p>
                      </div>

                      {/* Day selector */}
                      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:12}}>
                        {activeDiet.days.map((d,i)=>(
                          <button key={i} onClick={()=>setSelectedDay(i)}
                            style={{background:selectedDay===i?activeDiet.color:C.card,color:selectedDay===i?"#fff":C.textMid,border:`1.5px solid ${selectedDay===i?activeDiet.color:C.border}`,borderRadius:10,padding:"7px 12px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                            {d.day.slice(0,3)}
                          </button>
                        ))}
                      </div>

                      {/* Selected day meals */}
                      <div style={{background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
                        <p style={{margin:"0 0 12px",fontWeight:800,color:activeDiet.color,fontSize:15}}>📅 {activeDiet.days[selectedDay]?.day}</p>
                        {activeDiet.days[selectedDay]?.meals.map((m,j)=>(
                          <div key={j} style={{padding:"10px 0",borderBottom:j<activeDiet.days[selectedDay].meals.length-1?`1px dashed ${C.border}`:"none"}}>
                            <p style={{margin:0,fontSize:13,color:C.text,lineHeight:1.5}}>{m}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )
            }
          </div>
        )}

        {/* ── METAS ── */}
        {tab==="metas"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <h2 style={{margin:0,fontSize:20,fontWeight:800}}>🎯 Minhas Metas</h2>

            <div style={{background:C.card,borderRadius:18,padding:20,border:`1.5px solid ${C.green}50`,boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                <span style={{fontSize:18}}>☀️</span>
                <h3 style={{margin:0,fontSize:15,fontWeight:800,color:C.green}}>Metas Diárias</h3>
              </div>
              {[
                {label:"Calorias",val:totCal,max:goals.cal,unit:"kcal",color:C.green},
                {label:"Proteína",val:totProt,max:goals.prot,unit:"g",color:C.blue},
                {label:"Carboidratos",val:totCarb,max:goals.carb||250,unit:"g",color:C.accent},
                {label:"Gorduras",val:totFat,max:goals.fat||65,unit:"g",color:C.lime},
                {label:"Água",val:water,max:goals.water,unit:"copos",color:C.blue},
              ].map(g=>(
                <div key={g.label} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:13,color:C.textMid}}>{g.label}</span>
                    <span style={{fontSize:13,fontWeight:700,color:g.color}}>{g.val}/{g.max} {g.unit}</span>
                  </div>
                  <Bar val={g.val} max={g.max} color={g.color}/>
                </div>
              ))}
            </div>

            <div style={{background:C.card,borderRadius:18,padding:20,border:`1.5px solid ${C.accentYel}50`,boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                <span style={{fontSize:18}}>📅</span>
                <h3 style={{margin:0,fontSize:15,fontWeight:800,color:C.accentYel}}>Metas Semanais</h3>
              </div>
              {[
                {label:"Dias com registro",val:weekP.daysLogged,max:weekG.daysLogged},
                {label:"Treinos realizados",val:weekP.workouts,max:weekG.workouts},
                {label:"Dias dentro da meta água",val:weekP.waterStreak,max:weekG.waterStreak},
              ].map(g=>(
                <div key={g.label} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:13,color:C.textMid}}>{g.label}</span>
                    <span style={{fontSize:13,fontWeight:700,color:C.accentYel}}>{g.val}/{g.max}</span>
                  </div>
                  <Bar val={g.val} max={g.max} color={C.accentYel}/>
                </div>
              ))}
            </div>

            <div style={{background:C.card,borderRadius:18,padding:20,border:`1.5px solid ${C.accent}50`,boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                <span style={{fontSize:18}}>🗓️</span>
                <h3 style={{margin:0,fontSize:15,fontWeight:800,color:C.accent}}>Metas Mensais</h3>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:13,color:C.textMid}}>Dias ativos no mês</span>
                  <span style={{fontSize:13,fontWeight:700,color:C.accent}}>{monthP.daysActive}/{monthG.daysActive} dias</span>
                </div>
                <Bar val={monthP.daysActive} max={monthG.daysActive} color={C.accent}/>
              </div>
              <div style={{background:"#FFF3E8",borderRadius:12,padding:14,border:`1px solid ${C.accent}30`}}>
                <p style={{margin:0,fontSize:13,color:C.accent,fontWeight:800}}>🏆 Missão do mês</p>
                <p style={{margin:"5px 0 0",fontSize:13,color:C.textMid,lineHeight:1.5}}>Registre por 20 dias e ganhe o badge <strong>Consistência de Ouro</strong>!</p>
              </div>
            </div>

            <div style={{background:"linear-gradient(135deg,#FFF8F0,#FFE8D0)",borderRadius:18,padding:20,border:`1px solid ${C.accent}40`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <p style={{margin:0,fontSize:13,color:C.accent,fontWeight:800}}>🔥 Sequência atual</p>
                  <p style={{margin:"4px 0 0",fontSize:36,fontWeight:900,color:C.accent}}>0 <span style={{fontSize:15,fontWeight:600}}>dias</span></p>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:44}}>🔥</div>
                  <p style={{margin:"4px 0 0",fontSize:11,color:C.textMuted}}>Comece hoje!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PERFIL ── */}
        {tab==="perfil"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:`linear-gradient(135deg,${C.green},${C.lime})`,borderRadius:22,padding:24,textAlign:"center",boxShadow:`0 8px 28px ${C.green}30`}}>
              <div style={{width:68,height:68,borderRadius:"50%",background:"rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:32,border:"3px solid rgba(255,255,255,0.5)"}}>🌿</div>
              <h2 style={{margin:0,fontSize:22,fontWeight:900,color:"#fff"}}>Meu Perfil</h2>
              <p style={{margin:"4px 0 14px",color:"#ffffffcc",fontSize:13}}>{recDiet?`🎯 ${allDiets[recDiet]?.title}`:"Complete o quiz para seu plano!"}</p>
              <div style={{display:"flex",justifyContent:"center",gap:28}}>
                {[["Nível",level,"#fff"],["XP",xp,"#fff"],["Badges",badges.length,"#fff"]].map(([l,v,c])=>(
                  <div key={l}><div style={{fontSize:24,fontWeight:900,color:c}}>{v}</div><div style={{fontSize:11,color:"#ffffffaa"}}>{l}</div></div>
                ))}
              </div>
              <div style={{marginTop:16}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:11,color:"#ffffffaa"}}>Nível {level} → {level+1}</span>
                  <span style={{fontSize:11,color:"#ffffffcc"}}>{cur}/{max} XP</span>
                </div>
                <Bar val={cur} max={max} color="#fff" h={8}/>
              </div>
            </div>

            {userGoals && answers[8] && (
              <div style={{background:C.card,borderRadius:18,padding:18,border:`1.5px solid ${C.green}40`,boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}>
                <p style={{margin:"0 0 12px",fontSize:13,fontWeight:800,color:C.green,textTransform:"uppercase",letterSpacing:1}}>📊 Dados & Metas Calculadas</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {[
                    {label:"Peso",val:`${answers[8]} kg`,icon:"⚖️"},
                    {label:"Altura",val:`${answers[9]} cm`,icon:"📏"},
                    {label:"Gênero",val:answers[7]||"—",icon:"🧬"},
                    {label:"Atividade",val:(answers[2]||"—").split(" ")[0],icon:"🏃"},
                    {label:"Meta calórica",val:`${userGoals.cal} kcal`,icon:"🔥",full:true},
                    {label:"Proteína",val:`${userGoals.prot}g/dia`,icon:"💪"},
                    {label:"Carboidrato",val:`${userGoals.carb}g/dia`,icon:"🌾"},
                    {label:"Gordura",val:`${userGoals.fat}g/dia`,icon:"🥑"},
                    {label:"Água",val:`${userGoals.water} copos/dia`,icon:"💧",full:true},
                  ].map(item=>(
                    <div key={item.label} style={{gridColumn:item.full?"1/-1":"auto",background:C.cardAlt,borderRadius:12,padding:"10px 14px",border:`1px solid ${C.border}`}}>
                      <p style={{margin:0,fontSize:11,color:C.textMuted,fontWeight:600}}>{item.icon} {item.label}</p>
                      <p style={{margin:"3px 0 0",fontSize:14,fontWeight:800,color:C.text}}>{item.val}</p>
                    </div>
                  ))}
                </div>
                <p style={{margin:"12px 0 0",fontSize:11,color:C.textMuted,lineHeight:1.5}}>
                  * Calculado com a fórmula Mifflin-St Jeor ajustada para seu objetivo e nível de atividade.
                </p>
              </div>
            )}

            <h3 style={{margin:0,fontSize:16,fontWeight:800}}>🏅 Conquistas</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {BADGES.map(b=>{
                const got=badges.includes(b.id);
                return(
                  <div key={b.id} style={{background:got?C.card:"#f8faf6",borderRadius:14,padding:14,border:`1.5px solid ${got?C.green:C.border}`,opacity:got?1:0.55,position:"relative",boxShadow:got?"0 2px 10px rgba(58,140,78,.10)":"none"}}>
                    {got&&<div style={{position:"absolute",top:8,right:8,width:8,height:8,borderRadius:"50%",background:C.green}}/>}
                    <div style={{fontSize:28,marginBottom:6}}>{b.icon}</div>
                    <p style={{margin:0,fontSize:13,fontWeight:800,color:got?C.text:C.textMuted}}>{b.name}</p>
                    <p style={{margin:"3px 0 0",fontSize:11,color:C.textMuted,lineHeight:1.4}}>{b.desc}</p>
                    <p style={{margin:"7px 0 0",fontSize:11,color:C.accentYel,fontWeight:800}}>+{b.xp} XP</p>
                  </div>
                );
              })}
            </div>

            {customDiets.length>0&&(
              <>
                <h3 style={{margin:0,fontSize:16,fontWeight:800}}>👨‍🍳 Minhas Dietas ({customDiets.length})</h3>
                {customDiets.map(d=>(
                  <div key={d.key} onClick={()=>{setTab("dietas");setViewingCustom(d);}} style={{background:C.card,borderRadius:14,padding:"14px 16px",border:`1.5px solid ${C.green}40`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
                    <span style={{fontSize:24}}>{d.icon}</span>
                    <p style={{margin:0,fontWeight:700,fontSize:14}}>{d.title}</p>
                    <span style={{marginLeft:"auto",color:C.textMuted}}>→</span>
                  </div>
                ))}
              </>
            )}

            <button onClick={()=>{setScreen("quiz");setQuizStep(0);setAnswers({});}}
              style={{background:C.cardAlt,border:`1.5px solid ${C.green}`,borderRadius:14,padding:"14px",color:C.green,fontWeight:700,cursor:"pointer",fontSize:14}}>
              🔄 Refazer Questionário de Perfil
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:C.card,borderTop:`1.5px solid ${C.border}`,display:"flex",justifyContent:"space-around",padding:"10px 0 16px",zIndex:100,boxShadow:"0 -4px 18px rgba(58,140,78,.08)"}}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>{setTab(n.id);setShowBuilder(false);setViewingCustom(null);}}
            style={{background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px 10px"}}>
            <span style={{fontSize:22,filter:tab===n.id?"none":"grayscale(70%) opacity(60%)",transition:"filter .2s"}}>{n.icon}</span>
            <span style={{fontSize:10,color:tab===n.id?C.green:C.textMuted,fontWeight:tab===n.id?800:500}}>{n.lbl}</span>
            {tab===n.id&&<div style={{width:18,height:2.5,borderRadius:99,background:C.green}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
