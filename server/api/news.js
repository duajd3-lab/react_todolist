// server -> news.js
const { default: axios } = require('axios');
const  Cheerio  = require('cheerio');
const express = require('express');
const { header } = require('express/lib/response');
const router = express.Router(); //페이지 분리


router.get('/', async (req, res) => {
  const {keyword} = req.query;
  
  const d = await axios({
    url: `https://openapi.naver.com/v1/search/news.json?query=${keyword}&display=20&start=1&sort=date`,
    method: 'get',
    headers: {
      "X-Naver-Client-Id": "PykavQtQwchjCpb8y0TB",
      "X-Naver-Client-Secret": "zZxXfZ23SP"
    }
  })

  const newsList = d.data.items;

  const results = await Promise.all(
    newsList.map(async (item) => {
      const res = await axios.get(item.link, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      });
      const $ = Cheerio.load(res.data);

      return {
        ...item,
        image: $('meta[property="og:image"]').attr("content") || null,
      };
    })
  );

  res.send(results);




})



module.exports = router;