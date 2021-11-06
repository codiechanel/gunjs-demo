import type { Component } from "solid-js";
import { For } from "solid-js";
import Gun from "gun";
import "gun/lib/unset";
import "gun/lib/load";
import "gun/lib/then";
import faker from "faker";
import { createStore } from "solid-js/store";

import styles from "./App.module.css";

// "http://localhost:8765/gun",
// "https://gun-manhattan.herokuapp.com/gun",
let gun = Gun(["https://gun-demo86.herokuapp.com/gun"]);

let root = gun.get("fresh-branch");

/* root.load((x) => {
  console.log(x, "root load");
}); */

/* myList.once((y) => {
  console.log("y", y);
}); */

/* .on(function (data, id) {
    console.log(data, "the id", id);
  }); */

// console.log(faker.name.findName());

/* myList
.map((y) => {
  return y ?? undefined;
})
.once((data) => {

}) */

/* let machine = root.get("machine/tesseract");
machine.put({ faces: 24, cells: 8, edges: 32 });

let myList = root.get("mylist2");

myList.map((x) => {
  console.log("x", x);
});

myList.set(machine);
// @ts-ignore
myList.unset(machine);

console.log("mylist", myList);

myList.on((data) => {
  console.log(data, "d");
});
 */
/* myList.set({ name: "wow" + Date.now() }, (ack) => {
  console.log("ack", ack.ok, ack.err);
}); */
/* root.on((data) => {
  console.log(data, "d");
});

root.put({ name: "wow" + Date.now() }, (ack) => {
  console.log("ack", ack);
}); */
// root

const App: Component = () => {
  let myList = root.get("myList");
  let [store, setState] = createStore({
    list: {},
  });

  myList.load((x) => {
    console.log(x, "load");

    let newMap = Object.entries(x).reduce((acc, [key, value]) => {
      if (value) {
        console.log(key, value);
        acc[key] = value;
      }

      return acc;
    }, {});

    setState({ list: newMap });

    /*   Object.entries(x).forEach(([key, value]) => {
      console.log("key", key, value);
    }); */
  });
  return (
    <div class="bg-red-200">
      <For each={Object.entries(store.list)}>
        {([key, value]) => {
          return (
            <div>
              <span>{key}</span>
              <span>{value.name}</span>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    let tmp = gun.get(key);

                    myList.unset(tmp).then((ack) => {
                      console.log("unset ", ack);
                    });
                  }}
                  class="bg-gray-500 rounded p-1"
                >
                  delete
                </button>
              </div>
            </div>
          );
        }}
      </For>
      <button
        onClick={() => {
          let machine = gun.get("fresh-branch").get(Date.now().toString());
          machine.put({ name: faker.name.findName() }, (ack) => {
            console.log(ack);
          });

          myList.set(machine);
        }}
        class="bg-gray-500 rounded p-1"
      >
        {" "}
        add
      </button>
    </div>
  );
};

export default App;
