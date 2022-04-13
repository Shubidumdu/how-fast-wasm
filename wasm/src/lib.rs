extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
extern {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet() -> Result<(), JsValue>  {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");
        // Manufacture the element we're gonna append
    let val = document.create_element("p")?;
    val.set_text_content(Some("Hello, Wasm!! :)"));

    body.append_child(&val)?;

    Ok(())
}

#[wasm_bindgen]
pub fn dfs() -> () {
    let mut visited = [[false; 6]; 6];
    let target: [i32; 2] = [5, 5];
    let start: [i32; 2] = [0, 0];
    let directions: [[i32; 2]; 4] = [[1, 0], [0, -1], [-1, 0], [0, 1]];
    let mut stacks = vec![start];

    while let Some([row, col]) = stacks.pop() {
        console_log!("I'm now.. {}, {}", row, col);
        let [target_row, target_col] = target;
        if row == target_row && col == target_col {
            console_log!("Rust target found! ({}, {})", row, col);
            return;
        }
        visited[row as usize][col as usize] = true;
        let mut iter = directions.iter();
        while let Some([_row, _col]) = iter.next() {
            let next_row = row as i32 + _row;
            let next_col = col as i32 + _col;
            if next_row < 0 || 
                next_col < 0 || 
                next_row > (visited.len() - 1) as i32 || 
                next_col > (visited.len() - 1) as i32
            {
                continue;
            }
            let has_visited = visited[next_row as usize][next_col as usize];
            if !has_visited {
                stacks.push([next_row, next_col]);
            }
        }
    }
}
