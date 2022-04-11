extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() -> Result<(), JsValue>  {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("shouxxld have a document on window");
    let body = document.body().expect("document should have a body");
        // Manufacture the element we're gonna append
    let val = document.create_element("p")?;
    val.set_text_content(Some("Hello, Wasm!! :)"));

    body.append_child(&val)?;

    Ok(())
}
