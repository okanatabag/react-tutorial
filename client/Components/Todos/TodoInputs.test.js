import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import { shallow, mount, render } from "enzyme";
import TodoInputs from "./TodoInputs";
describe("Component TodoInputs", function() {
    it("should have 1 text input", function() {
        const wrapper = shallow(<TodoInputs todoIdElement={{element:"id",val:""}} todoTextElement={{element:"text",val:""}} />);
        expect(wrapper.find("input[type='text']").length).to.equal(1)
    });
    it("should have 1 hidden input", function() {
        const wrapper = shallow(<TodoInputs todoIdElement={{element:"id",val:""}} todoTextElement={{element:"text",val:""}} />);
        expect(wrapper.find("input[type='hidden']").length).to.equal(1)
    });
    it("should have 1 clearfix", function() {
        const wrapper = shallow(<TodoInputs todoIdElement={{element:"id",val:""}} todoTextElement={{element:"text",val:""}} />);
        expect(wrapper.find(".clear").length).to.equal(1)
    });
    it("simulates click setTodo with empty id", () => {
        const setTodo = sinon.spy();
        const wrapper = shallow(<TodoInputs todoIdElement={{element:"id",val:""}} todoTextElement={{element:"text",val:"okan"}} setTodo={setTodo}/>);
        wrapper.find("button").first().simulate("click");
        expect(setTodo.calledOnce).to.equal(true);
    });
    it("simulates click setTodo with defined id", () => {
        const setTodo = sinon.spy();
        const wrapper = shallow(<TodoInputs todoIdElement={{element:"id",val:"1"}} todoTextElement={{element:"text",val:"okan"}} setTodo={setTodo}/>);
        wrapper.find("button").first().simulate("click");
        expect(setTodo.calledOnce).to.equal(true);
    });
});
