import { shallowMount } from "@vue/test-utils";
import NewTodo from "./../../views/NewTodo.vue";
import axios from "axios";
import flushPromises from "flush-promises";

jest.mock("axios");
let wrapper;

function setup() {
  wrapper = shallowMount(NewTodo, {
    mocks: {
      $router: {
        push: jest.fn(),
      },
    },
  });
}

describe("Page: NewTodo", () => {
  it("shows error message when btn click and form incomplete", async () => {
    setup();

    await wrapper.findComponent({ ref: "inputTodo" }).setValue("someTodo");
    expect(wrapper.findComponent({ ref: "errorMessage" }).exists()).toBeFalsy();

    await wrapper.findComponent({ ref: "button" }).trigger("click");
    expect(
      wrapper.findComponent({ ref: "errorMessage" }).exists(),
    ).toBeTruthy();
  });

  it("redirects to vuejs_unit_test_using_jest when save data success and status 201", async () => {
    axios.post.mockResolvedValue({ status: 201, message: "insert success" });
    setup();

    await wrapper.findComponent({ ref: "inputTodo" }).setValue("someTodo");
    await wrapper.findComponent({ ref: "inputWhere" }).setValue("someWhere");
    await wrapper.findComponent({ ref: "inputDetail" }).setValue("someDetail");

    await wrapper.findComponent({ ref: "button" }).trigger("click");
    expect(
      wrapper.findComponent({ ref: "button" }).attributes("disabled"),
    ).toBeTruthy();
    expect(wrapper.findComponent({ ref: "errorMessage" }).exists()).toBeFalsy();

    await flushPromises();
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: "vuejs_unit_test_using_jest",
    });
  });

  it("shows error message when save data success and status not 201", async () => {
    axios.post.mockResolvedValue({
      status: 500,
      message: "internal server error",
    });
    setup();

    await wrapper.findComponent({ ref: "inputTodo" }).setValue("someTodo");
    await wrapper.findComponent({ ref: "inputWhere" }).setValue("someWhere");
    await wrapper.findComponent({ ref: "inputDetail" }).setValue("someDetail");

    await wrapper.findComponent({ ref: "button" }).trigger("click");

    await flushPromises();
    expect(
      wrapper.findComponent({ ref: "errorMessage" }).exists(),
    ).toBeTruthy();
  });

  it("show error message when save data failed", async () => {
    axios.post.mockRejectedValue({ message: "error" });
    setup();

    await wrapper.findComponent({ ref: "inputTodo" }).setValue("someTodo");
    await wrapper.findComponent({ ref: "inputWhere" }).setValue("someWhere");
    await wrapper.findComponent({ ref: "inputDetail" }).setValue("someDetail");

    await wrapper.findComponent({ ref: "button" }).trigger("click");

    await flushPromises();

    expect(
      wrapper.findComponent({ ref: "errorMessage" }).exists(),
    ).toBeTruthy();
  });
});
