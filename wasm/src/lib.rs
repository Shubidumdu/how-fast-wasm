use wasm_bindgen::prelude::*;
extern crate wasm_bindgen;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct DfsInput {
    pub start: [i32; 2],
    pub target: [i32; 2],
    pub size: [usize; 2],
}

const DIRECTIONS: [[i32; 2]; 4] = [[1, 0], [0, -1], [-1, 0], [0, 1]];

#[wasm_bindgen]
pub fn dfs(dfs_options: &JsValue, on_search: js_sys::Function, on_finish: js_sys::Function) -> () {
    let inputs: DfsInput = dfs_options.into_serde().unwrap();
    let [row_size, col_size] = inputs.size;
    let start = inputs.start;
    let target = inputs.target;
    let mut stacks = vec![start];
    let mut visited = vec![vec![false; col_size]; row_size];

    while let Some([row, col]) = stacks.pop() {
        on_search.call2(&JsValue::null(), &JsValue::from(row), &JsValue::from(col)).unwrap();
        let [target_row, target_col] = target;
        if row == target_row && col == target_col {
            on_finish.call2(&JsValue::null(), &JsValue::from(row), &JsValue::from(col)).unwrap();
            return;
        }
        visited[row as usize][col as usize] = true;
        let mut iter = DIRECTIONS.iter();
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
