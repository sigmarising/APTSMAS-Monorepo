import { onMounted } from "vue";

const ICO_RANGE = [1, 6];

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // include min and max
}

export function useDynamicIco(selectId?: number): void {
  onMounted(() => {
    const el: HTMLLinkElement | null =
      document.querySelector("link[rel*='icon']");

    if (el !== null) {
      // specific new ico
      if (selectId !== undefined) {
        el.href = "/ico" + selectId.toString() + ".ico";
      }
      // random a new icon
      else {
        let newHref: string = el.href;
        while (newHref === el.href) {
          const newNameCount = getRandomIntInclusive(
            ICO_RANGE[0],
            ICO_RANGE[1]
          ).toString();
          newHref = "/ico" + newNameCount + ".ico";
        }
        el.href = newHref;
      }
    }
  });
}
