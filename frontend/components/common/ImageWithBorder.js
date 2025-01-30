import {Card, Image} from "@nextui-org/react";
import {memo} from "react";

export const ImageWithBorder = memo(({url, width, height, classNameImage, classNameCard, radius}) => (
    <Card className={"border-[2px] border-black p-0 " + classNameCard}>
        <Image
            src={url}
            alt="Image"
            width={width}
            height={height}
            radius={radius || 'xl'}
            className={classNameImage + "object-fit"}
        />
    </Card>
));