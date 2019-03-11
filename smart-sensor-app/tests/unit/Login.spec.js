import { mount } from "@vue/test-utils";
import Login from "@/components/Login.vue";

describe("Login.vue", () => {
  it("renders data.email when passed", () => {
    const wrapper = mount(Login);
    expect(wrapper.vm.email).toBe("");
  });
});
