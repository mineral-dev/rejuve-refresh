import Link from "next/link"
import ImageWidth from "./ImageWidth"
import SlideMenus from "./SlideMenus"

export default function Menus({data = []}) {
    if (data?.length === 0) {
        return (
            <section className="flex-grow flex justify-center items-center h-80 my-24 w-auto">
                <div className="flex flex-col space-y-4 items-center">
                <span className="text-primary-900 font-bold">We are preparing something new. Stay Tune.</span>
                <Link className="btn-primary-outline mx-4 mb-4" href="/menu">
                    Show All
                </Link>
                </div>
            </section>
        )
    }

    if (data?.length === 1) {
        return (
            <section className="flex-grow relative flex items-center justify-center py-6 md:py-12">
              <div className="relative w-5/6 lg:w-3/6 flex justify-center">
                <ImageWidth data={data[0]?.Image} dbtable="fnb" />
              </div>
            </section>
        )
    }

    return (
        <SlideMenus data={data} imageDb="fnb" /> 
    )
}