import React, { useEffect, useState } from "react";
import "../main.css"
import styles from "./app.module.css"

const BASE_URL = "http://localhost:9000/";

const App = () => {


  const [data, setdata] = useState(null);
  const [filterdata, setfilterdata] = useState(null);
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(null)



  useEffect(() => {

    const fetchfooddata = async () => {

      setloading(true);
      try {


        const response = await fetch(BASE_URL)
        const json = await response.json()
        setdata(json)
        setfilterdata(json)
        setloading(false)

      } catch (error) {
        seterror("Unable to fetch data")
      }

    };



    fetchfooddata()
  }, []);

  const searchfood = (e) => {
    const searchvalue = e.target.value;

    if (searchvalue === "") {
      setfilterdata(null)
    }
    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchvalue.toLowerCase()));
    setfilterdata(filter);
  }

  const filterfood = (type) => {
    if (type === "all") {
      setfilterdata(data)

      return;
    }
    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
    setfilterdata(filter);

  }


  if (error) return <div>{error}</div>
  if (loading) return <div>Loading...</div>


  return <div className={styles.main}>
    <div className={styles.top}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="" />
      </div>
      <div className={styles.search}>
        <input onChange={searchfood} type="search" name="" id="" placeholder="Search Food..." />
      </div>
    </div>
    <div className={styles.filter}>
      <button onClick={() => filterfood("all")}>All</button>
      <button onClick={() => filterfood("breakfast")}>BreakFast</button>
      <button onClick={() => filterfood("lunch")}>Lunch</button>
      <button onClick={() => filterfood("dinner")}>Dinner</button>
    </div>

    <div className={styles.foodcontainer}>
      <div className={styles.foodcards}>
        {filterdata?.map(({ name, image, text, price }) =>
          <div className={styles.foodcard} key={name}>
            <div className={styles.img_pic}>
              <img src={image} alt="" />
            </div>
            <div className={styles.foodinfo}>
              <div className={styles.info}>
                <h3>{name}</h3>
                <p>{text}</p>

              </div>
              <button>${price}</button>
            </div>

          </div>)}

      </div>
    </div>
  </div>;
};

export default App;
