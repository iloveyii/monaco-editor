var jsCode = [
  '"use strict";',
  "function Person(age) {",
  "	if (age) {",
  "		this.age = age;",
  "	}",
  "}",
  "Person.prototype.getAge = function () {",
  "	return this.age;",
  "};",
].join("\n");

(function () {
  setTimeout(() => {
    var editor = monaco.editor.create(document.getElementById("editor"), {
      value: jsCode,
      language: "javascript",
      height: "50vh",
      width: "100%",
      wordWrap: "on",
    });

    var editorTutorial = monaco.editor.create(
      document.getElementById("tutorial"),
      {
        value: jsCode,
        language: "javascript",
        height: "50vh",
        width: "100%",
        dragAndDrop: true,
        rulers: 3,
        lineNumbers: "on",
        wordWrap: "on",
        editorClassName: "editorClassName",
        fontSize: 20,
        cursorStyle: "underline",
        options: {
          dragAndDrop: true,
          rulers: 3,
          lineNumbers: "off",
          wordWrap: "on",
          editorClassName: "editorClassName",
        },
      }
    );
    console.log("Keycode", monaco.KeyMod);
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_V,
      function () {
        const selection = editor.getSelection();
        console.log("monaco.KeyMod.CtrlCmd V", selection);
        const range = new monaco.Range(
          window.pos.lineNumber,
          window.pos.column,
          window.pos.lineNumber,
          window.pos.column
        );
        // const range = new monaco.Range(10, 1, 10, 5);
        window.range = range;
        editor.executeEdits("", [{ range, text: window.txt }]);
        console.log("Position : ", (window.position = editor.getPosition()));
        return true;
      }
    );

    editor.onMouseUp(function (e) {
      console.log("onMouseUp - " + e.target.toString());
      window.pos = editor.getPosition();
    });

    editor.onKeyUp(function (e) {
      console.log("onKeyUp - " + e.target.value);
      window.pos = editor.getPosition();
    });

    editorTutorial.onMouseUp(function (e) {
      console.log("onMouseUp - " + e.target.toString());
      window.txt = checkMe();
    });

    editorTutorial.onKeyUp(function (e) {
      console.log("onKeyUp - " + e.target.value);
      window.txt = checkMe();
    });

    editor.onMouseDown(function (e) {
      console.log("onMouseDown", e.target.toString());
    });

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_C,
      function () {
        const selection = editor.getSelection();
        // console.log("value :", editor.getValue());
        console.log("monaco.KeyMod.CtrlCmd C", selection);
        const range = new monaco.Range(1, 1, 1, 5);
        editor.executeEdits("", [{ range, text: "new text" }]);
        return true;
      }
    );

    var myCondition1 = editor.createContextKey(
      /*key name*/ "myCondition1",
      /*default value*/ false
    );
    var myCondition2 = editor.createContextKey(
      /*key name*/ "myCondition2",
      /*default value*/ false
    );

    editor.addCommand(
      monaco.KeyCode.Tab,
      function () {
        // services available in `ctx`
        console.log("my command is executing! on tab");
      },
      "myCondition1 && myCondition2"
    );

    editor.addCommand(
      monaco.KeyCode.action,
      function () {
        console.log("action");
      },
      "myCondition1"
    );

    myCondition1.set(true);

    setTimeout(function () {
      console.log("now enabling also myCondition2, try pressing Tab!");
      myCondition2.set(true);
      // you can use myCondition2.reset() to go back to the default
    }, 2000);
  }, 2000);
})();

function checkMe() {
  var txt = "";

  if (window.getSelection) {
    txt = window.getSelection().toString();
  } else if (document.getSelection) {
    txt = document.getSelection().toString();
  } else if (document.selection) {
    txt = document.selection.createRange().text;
  }

  console.log("Selected text is : " + txt);
  return txt;
}
