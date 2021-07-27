import vuejs_unit_test_using_jest from "../../views/vuejs_unit_test_using_jest.vue";
import { shallowMount } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import mockDataTodo from "../../mockData/todoData.json";

jest.mock("axios");

let wrapper;

function setup() {
  wrapper = shallowMount(vuejs_unit_test_using_jest);
}
describe("Page: vuejs_unit_test_using_jest", () => {
  it("shows error message if getTodo got error response", async () => {
    axios.get.mockRejectedValue({ message: "error" });
    setup();

    expect(
      wrapper.findComponent({ ref: "loadingState" }).exists(),
    ).toBeTruthy();
    await flushPromises();
    expect(wrapper.findComponent({ ref: "errorState" }).exists()).toBeTruthy();
  });

  it("shows empty message if getTodo success but no data", async () => {
    axios.get.mockResolvedValue({ data: [] });
    setup();

    expect(
      wrapper.findComponent({ ref: "loadingState" }).exists(),
    ).toBeTruthy();
    await flushPromises();
    expect(wrapper.findComponent({ ref: "emptyState" }).exists()).toBeTruthy();
  });

  it("shows data when getTodo success", async () => {
    axios.get.mockResolvedValue({ data: mockDataTodo });
    setup();

    expect(
      wrapper.findComponent({ ref: "loadingState" }).exists(),
    ).toBeTruthy();
    await flushPromises();
    expect(
      wrapper.findComponent({ ref: "successState" }).exists(),
    ).toBeTruthy();
  });

  test("the total number of todo card should be same with total response data", async () => {
    axios.get.mockResolvedValue({ data: mockDataTodo });
    setup();

    expect(
      wrapper.findComponent({ ref: "loadingState" }).exists(),
    ).toBeTruthy();
    await flushPromises();
    expect(wrapper.findAllComponents({ ref: "todoCard" }).length).toBe(
      mockDataTodo.length,
    );
  });
});
