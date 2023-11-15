import {
  defineComponent,
  ref,
  ExtractPropTypes,
  ComponentPublicInstance,
} from "vue";

const helloWorldProps = () => ({
  title: {
    type: String,
    default: "Hello World",
  },
});

export type HelloWorldExpose = {
  addCount: () => void;
  count: number;
};

export type HelloWorldProps = Partial<
  ExtractPropTypes<ReturnType<typeof helloWorldProps>>
>;

export type HelloWorldInstance = ComponentPublicInstance<
  HelloWorldProps,
  HelloWorldExpose
>;

const HelloWorld = defineComponent({
  name: "HelloWorld",
  props: helloWorldProps(),
  setup(props, { expose }) {
    const count = ref(0);

    const addCount = () => {
      count.value += 1;
    };

    expose({
      addCount,
      count,
    });

    return () => (
      <div>
        <h1>{props.title}</h1>
        <p>{count.value}</p>
        <button onClick={addCount}>add count</button>
      </div>
    );
  },
});

export default HelloWorld;
