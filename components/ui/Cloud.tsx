import type { HTMLAttributes } from "react";
import cx from "classnames";

import { joinTruthyValues } from "@/utils/joinTruthyValues";

interface Props extends HTMLAttributes<HTMLDivElement> {
  layerLength?: number;
}

export function Cloud({ className, layerLength = 8, ...props }: Props) {
  const perLayerPercent = 100 / layerLength;
  const layer = createCloudLayerFilterPixel({
    filterPoint: 10,
    length: layerLength,
  });

  return (
    <div className={cx("relative w-full h-full", className)} {...props}>
      {layer.map((filter, index) => {
        const maskLayerPercent1 = index * perLayerPercent;
        const maskLayerPercent2 = (index + 1) * perLayerPercent;
        const maskLayerPercent3 = (index + 2) * perLayerPercent;
        const maskLayerPercent4 = (index + 3) * perLayerPercent;

        return (
          <div
            key={index}
            style={{
              zIndex: index + 1,
              backdropFilter: `blur(${filter})`,
              maskImage: `linear-gradient(to top, ${joinTruthyValues({
                fields: [
                  isOver100(maskLayerPercent1)
                    ? null
                    : `rgba(0, 0, 0, 0) ${maskLayerPercent1}%`,
                  isOver100(maskLayerPercent2)
                    ? null
                    : `rgb(0, 0, 0) ${maskLayerPercent2}%`,
                  isOver100(maskLayerPercent3)
                    ? null
                    : `rgb(0, 0, 0) ${maskLayerPercent3}%`,
                  isOver100(maskLayerPercent4)
                    ? null
                    : `rgba(0, 0, 0, 0) ${maskLayerPercent4}%`,
                ],
                delimiter: ",",
              })})`,
            }}
            className="absolute inset-0 pointer-events-none"
          />
        );
      })}
    </div>
  );
}

function repeatedDivide(num: number, count: number): number {
  if (count === 1) {
    return num;
  }

  return repeatedDivide(num / 2, count - 1);
}

function createCloudLayerFilterPixel(params: {
  filterPoint: number;
  length: number;
}): string[] {
  const { filterPoint, length } = params;

  const reverseIndexList = Array.from({ length }, (_, index) => length - index);

  return reverseIndexList.map(
    (reversIndex) => `${repeatedDivide(filterPoint, reversIndex)}px`,
  );
}

function isOver100(num: number): boolean {
  return num > 100;
}
