import clsx from "clsx";
import type { FunctionComponent } from "preact";
import { useCallback, useRef, useState } from "preact/hooks";
import type { SpritesheetManifest } from "../../assets/schema";
import styles from "./Spritesheet.module.css";

export type SpritesheetProps = {
  manifest: SpritesheetManifest;
  headerLink?: boolean;
};

export const Spritesheet: FunctionComponent<SpritesheetProps> = ({
  manifest,
  headerLink,
}) => {
  const { width, height, size } = manifest;
  const cellWidth = Math.floor(width / size);
  const cellHeight = Math.floor(height / size);

  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(() => {
    if (size === 8) return 4;
    if (size === 24) return 4;
    return 1;
  });

  const [hovered, setHovered] = useState<[number, number] | null>(null);
  const onMouseMove = useCallback(
    (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      const imgX = ev.clientX - rect.left;
      const imgY = ev.clientY - rect.top;

      const cellX = Math.floor(imgX / scale / size);
      const cellY = Math.floor(imgY / scale / size);

      if (!hovered || hovered[0] !== cellX || hovered[1] !== cellY) {
        console.log(`Hovering ${manifest.id}: ${cellX}, ${cellY}`);
      }

      setHovered([cellX, cellY]);
    },
    [manifest, hovered, scale]
  );
  const onMouseLeave = useCallback((ev: MouseEvent) => {
    setHovered(null);
  }, []);
  const onClick = useCallback(
    (ev: MouseEvent) => {
      if (!hovered) return;

      let spritePath;

      const spriteConfig = manifest.sprites.find(
        (s) => s.x === hovered[0] && s.y === hovered[1]
      );
      if (spriteConfig) {
        spritePath = `/sprites/${spriteConfig.name}.png`;
      } else {
        spritePath = manifest.assetPath.replace(
          ".png",
          `_${hovered[0]}_${hovered[1]}.png`
        );
      }

      const url = new URL(window.location.origin + spritePath);
      window.location.href = url.toString();
    },
    [manifest, hovered]
  );

  return (
    <div className={styles.container}>
      {headerLink ? (
        <a href={`/browse/${manifest.id}`}>{manifest.id}</a>
      ) : (
        <span className={styles.header}>{manifest.id}</span>
      )}
      <span className="subtle"> - </span>
      <a href={manifest.assetPath}>raw</a>
      <span className="subtle">/</span>
      <a href={manifest.url}>source</a>

      <ul>
        <li>
          {width}x{height} ({cellWidth}x{cellHeight} of {size}x{size})
        </li>
        {scale !== 1 && (
          <>
            <li>Displayed at {scale}x resolution</li>
          </>
        )}
        <li>
          Last changed at{" "}
          {new Date(manifest.fileHashSince)
            .toISOString()
            .split(".")[0]
            .replace("T", " ")}{" "}
          UTC
        </li>
      </ul>
      <div className={styles.imageBorder}>
        <div
          className={styles.imageContainer}
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          style={{
            width: width * scale + "px",
            height: height * scale + "px",
          }}
        >
          <img
            className={styles.image}
            src={manifest.assetPath}
            width={width * scale}
            height={height * scale}
          ></img>
          {hovered && (
            <div
              className={clsx([styles.highlight])}
              style={{
                width: size * scale + "px",
                height: size * scale + "px",
                left: hovered[0] * size * scale,
                top: hovered[1] * size * scale,
                zIndex: 1,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
