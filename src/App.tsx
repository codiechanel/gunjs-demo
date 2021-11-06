import type { Component } from "solid-js";
import { For } from "solid-js";
import Gun from "gun";
import "gun/lib/unset";
import "gun/lib/load";
import "gun/lib/then";
import faker from "faker";
import { createStore, produce } from "solid-js/store";

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

  /*  let cool = myList.once().map((val, key) => {
    console.log("map", val, key);

    return val ?? undefined;
  });

  console.log("cool", cool); */

  /* this will listen for additions */
  myList
    .map((val, key) => {
      // console.log("map", val, key);

      return val ?? undefined;
    })
    .once((x, key) => {
      // console.log("map 1", val, key);
      if (x) {
        console.log("adding...", key);

        setState(
          produce((s: any) => {
            s.list[key] = x;
          })
        );
      }
    });
  /* (val, key) => {
      // console.log("map", val, key);

      return val ?? undefined;
    } */

  /* this will listen for deletions */
  myList
    // .once()
    .map()
    .on((x, key) => {
      if (x) {
        /*    setState(
          produce((s: any) => {
            s.list[key] = x;
          })
        ); */
      } else {
        if (store.list[key]) {
          console.log("delete x", x, key);
          setState(
            produce((s: any) => {
              s.list[key] = undefined;
            })
          );
        }
      }
    });

  /*   myList.load((x) => {
    console.log(x, "load");

    let newMap = Object.entries(x).reduce((acc, [key, value]) => {
      if (value) {
        console.log(key, value);
        acc[key] = value;
      }

      return acc;
    }, {});

    setState({ list: newMap });
  }); */
  return (
    <div class="bg-red-200">
      <For each={Object.entries(store.list)}>
        {([key, value]) => {
          return (
            <div>
              <span>{key}</span>
              {/* @ts-ignore */}
              <span>{value.name}</span>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    let tmp = gun.get(key);
                    console.log("deleting", key);

                    // tmp.put(undefined);
                    myList.get(key).put(null);

                    // @ts-ignore
                    /*    myList.unset(tmp).then((ack) => {
                      console.log("unset ", ack);
                    }); */

                    /*   setState(
                        produce((s: any) => {
                          s.list[key] = undefined;
                        })
                      ); */
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
          let key = Date.now().toString();
          let machine = gun.get("fresh-branch").get(key);
          let o = { name: faker.name.findName() };
          machine.put(o, (ack) => {
            console.log(ack);
          });

          // @ts-ignore
          myList.set(machine).then((x) => {
            console.log("set succ", x);
            /*   setState(
              produce((s: any) => {
                s.list[key] = o;
              })
            ); */
          });
        }}
        class="bg-gray-500 rounded p-1"
      >
        add
      </button>
      <button>rename</button>
    </div>
  );
};

export default App;
