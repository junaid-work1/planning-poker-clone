import { brandsArray } from 'constants/imgArray'

const Brands = () => (
  <div className='sm:mb-16 sm:block hidden'>
    <div className='brands-title text-center pt-20'>
      <h1 className='text-4xl font-bold'>Thousands of teams trust weagileyou worldwide</h1>
    </div>
    <div className='brands-main grid grid-cols-7 gap-8 p-10 w-9/12 mx-auto'>
      {brandsArray.map((image, index) => (
        <img src={image} alt='Nokia' key={index.toString() + 1} />
      ))}
    </div>
  </div>
)

export default Brands
