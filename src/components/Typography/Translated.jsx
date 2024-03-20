import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Translated = ({ children }) => {
  const textRef = useRef();
  const [text, setText] = useState(children);
  const { type } = useSelector((state) => state.text);

  useEffect(() => {
    if (type === "cyrillic") {
      setText(getCyrillicText(text));
    } else {
      setText(children);
    }
  }, [type]);

  /*
  function latinToCyrillic(word) {
    const LATIN_LETTERS = {
      YO: "Ё",
      I: "Й",
      TS: "Ц",
      U: "У",
      K: "К",
      E: "Е",
      N: "Н",
      G: "Г",
      SH: "Ш",
      SCH: "Щ",
      Z: "З",
      H: "Х",
      Q: "Қ",
      q: "қ",
      "'": "Ъ",
      yo: "ё",
      i: "й",
      ts: "ц",
      u: "у",
      k: "к",
      e: "е",
      n: "н",
      g: "г",
      sh: "ш",
      sch: "щ",
      z: "з",
      h: "х",
      "'": "ъ",
      F: "Ф",
      I: "Ы",
      V: "В",
      A: "А",
      P: "П",
      R: "Р",
      O: "О",
      L: "Л",
      D: "Д",
      J: "Ж",
      E: "Э",
      f: "ф",
      v: "в",
      a: "а",
      p: "п",
      r: "р",
      o: "о",
      l: "л",
      d: "д",
      j: "ж",
      e: "э",
      Ya: "Я",
      CH: "Ч",
      S: "С",
      M: "М",
      I: "И",
      T: "Т",
      B: "Б",
      YU: "Ю",
      ya: "я",
      ch: "ч",
      s: "с",
      m: "м",
      i: "и",
      t: "т",
      b: "б",
      yu: "ю",
      y: "й",
      Y: "Й",
      "o'": "ў",
    };

    return word
      .split("")
      .map(function (char) {
        return LATIN_LETTERS[char] || char;
      })
      .join("");
  }
  */
  /*
  function cyrillicToLatin(word) {
    const CYRILLIC_LETTERS = {
      Ё: "YO",
      Й: "I",
      Ц: "TS",
      У: "U",
      К: "K",
      Е: "E",
      Н: "N",
      Г: "G",
      Ш: "SH",
      Щ: "SCH",
      З: "Z",
      Х: "H",
      Ъ: "'",
      ё: "yo",
      й: "i",
      ц: "ts",
      у: "u",
      к: "k",
      е: "e",
      н: "n",
      г: "g",
      ш: "sh",
      щ: "sch",
      з: "z",
      х: "h",
      ъ: "'",
      Ф: "F",
      Ы: "I",
      В: "V",
      А: "A",
      П: "P",
      Р: "R",
      О: "O",
      Л: "L",
      Д: "D",
      Ж: "ZH",
      Э: "E",
      ф: "f",
      ы: "i",
      в: "v",
      а: "a",
      п: "p",
      р: "r",
      о: "o",
      л: "l",
      д: "d",
      ж: "zh",
      э: "e",
      Я: "Ya",
      Ч: "CH",
      С: "S",
      М: "M",
      И: "I",
      Т: "T",
      Ь: "'",
      Б: "B",
      Ю: "YU",
      я: "ya",
      ч: "ch",
      с: "s",
      м: "m",
      и: "i",
      т: "t",
      ь: "'",
      б: "b",
      ю: "yu",
    };

    return word
      .split("")
      .map(function (char) {
        return CYRILLIC_LETTERS[char] || char;
      })
      .join("");
  }
  */

  function getCyrillicText(latinText) {
    let latCyr = {
      A: "&#1040;",
      B: "&#1041;",
      V: "&#1042;",
      G: "&#1043;",
      D: "&#1044;",
      Ye: "&#1045;",
      YE: "&#1045;",
      J: "&#1046;",
      Z: "&#1047;",
      I: "&#1048;",
      Y: "&#1049;",
      K: "&#1050;",
      L: "&#1051;",
      M: "&#1052;",
      N: "&#1053;",
      O: "&#1054;",
      P: "&#1055;",
      R: "&#1056;",
      S: "&#1057;",
      T: "&#1058;",
      U: "&#1059;",
      F: "&#1060;",
      X: "&#1061;",
      Ts: "&#1062;",
      TS: "&#1062;",
      Ch: "&#1063;",
      CH: "&#1063;",
      Sh: "&#1064;",
      SH: "&#1064;",
      EE: "&#1069;", //Ergash
      Yu: "&#1070;",
      YU: "&#1070;",
      Ya: "&#1071;",
      YA: "&#1071;",
      "G'": "&#1170;",
      "G`": "&#1170;",
      "G’": "&#1170;",
      "O'": "&#1038;",
      "O`": "&#1038;",
      "O’": "&#1038;",
      Yo: "&#1025;",
      YO: "&#1025;",
      Q: "&#1178;",
      H: "&#1202;", //&#1061 is x; is need to change to original &#1202;
      a: "&#1072;",
      b: "&#1073;",
      v: "&#1074;",
      g: "&#1075;",
      d: "&#1076;",
      ye: "&#1077;",
      yE: "&#1077;",
      j: "&#1078;",
      z: "&#1079;",
      i: "&#1080;",
      y: "&#1081;",
      k: "&#1082;",
      l: "&#1083;",
      m: "&#1084;",
      n: "&#1085;",
      o: "&#1086;",
      p: "&#1087;",
      r: "&#1088;",
      s: "&#1089;",
      t: "&#1090;",
      u: "&#1091;",
      f: "&#1092;",
      x: "&#1093;",
      ts: "&#1094;",
      tS: "&#1094;",
      ch: "&#1095;",
      cH: "&#1095;",
      sh: "&#1096;",
      sH: "&#1096;",
      "'": "&#1098;",
      "’": "&#1098;",
      "`": "&#1098;",
      ee: "&#1101;", //ergash
      eE: "&#1101;", //ergash
      e: "&#1077;",
      yu: "&#1102;",
      yU: "&#1102;",
      ya: "&#1103;",
      yA: "&#1103;",
      "o'": "&#1118;",
      "o`": "&#1118;",
      "o’": "&#1118;",
      q: "&#1179;",
      "g'": "&#1171;",
      "g`": "&#1171;",
      "g’": "&#1171;",
      yo: "&#1105;",
      yO: "&#1105;",
      h: "&#1203;", // (isMobile ? "&#1093;":"&#1203;)
    };

    if (!latinText) {
      return "";
    }
    let cyrText = "";
    for (let i = 0, len = latinText.length; i < len; i++) {
      let curLetter = latinText[i];
      if (curLetter == "e" || curLetter == "E") {
        //prevent pre E, erkin
        if (i == 0 || " -.,\n)('?/".indexOf(latinText[i - 1]) != -1) {
          curLetter += curLetter;
        }
      }

      let pos1Txt = latinText[i + 1];
      let pos2Txt = latinText[i + 2];

      if (
        !(
          (curLetter == "y" || curLetter == "Y") &&
          (pos2Txt == "'" || pos2Txt == "’" || pos2Txt == "`")
        ) &&
        i != len - 1 &&
        !(curLetter == "t" && pos1Txt == "s" && latinText[i + 3] == "z")
      ) {
        let dualLetter = latCyr[curLetter + pos1Txt];
        if (dualLetter) {
          cyrText += dualLetter;
          i++;
          continue;
        }
      }
      cyrText += latCyr[curLetter] || curLetter;
    }
    return cyrText;
  }

  return <span ref={textRef} dangerouslySetInnerHTML={{ __html: text }} />;
};

export default Translated;
