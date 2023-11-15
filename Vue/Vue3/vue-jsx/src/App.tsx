import { defineComponent, onMounted, ref } from "vue";
import HelloWorld, { HelloWorldInstance } from "./components/HelloWorld";

export default defineComponent({
  name: "App",
  setup() {
    const helloWordRef = ref<HelloWorldInstance | null>(null);

    onMounted(() => {
      helloWordRef.value?.addCount();
    });

    return () => (
      <div id="app">
        <HelloWorld ref={helloWordRef} title="Hello World" />
      </div>
    );
  },
});
