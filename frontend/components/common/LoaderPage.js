
export const LoaderPage = () => {
    return (
        <div
            data-bg={true}
            className={'dashboard-content'}
        >
            <div className={'min-h-[100vh] flex-1 overflow-hidden loader-bg '}>
                <div className={"absolute top-[29vh] left-[25%] md:left-[45%] w-[200px]"}>
                    <div className={"small-gear"}/>
                    <div className={"big-gear"}/>
                </div>
            </div>

        </div>
    )
}
