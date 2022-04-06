export interface SwiperItem {
  label: string
  link: string
}

export interface SwiperNavigation {
  slidesPerView: number
  spaceBetween: number
  textAlgin: string
  swiperList: Array<SwiperItem>
}
