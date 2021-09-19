import { Builder, By, Key, until } from "selenium-webdriver";
import { getDaysInMonth, startOfMonth, add, getDay } from "date-fns";
import { kingoftimeConfig } from "../env";
import { endTime } from "./endtime";

const sleep = (second: number) => {
  return new Promise((resolve) => setTimeout(resolve, second * 1000));
};

const dakoku = async () => {
  const today = new Date();
  // 月の初めの日
  const startDayOfTheMonth = startOfMonth(today);
  // 今月の日数
  const daysInTheMonth = getDaysInMonth(today);
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // まずking of timeの画面に飛ぶ
    await driver.get(kingoftimeConfig.url);

    //ID/passwordを入力してログイン
    await driver.findElement(By.id("login_id")).sendKeys(kingoftimeConfig.id!);
    await driver
      .findElement(By.id("login_password"))
      .sendKeys(kingoftimeConfig.pass!, Key.ENTER);

    // 打刻編集
    for (let i = 0; i < daysInTheMonth; i++) {
      const targetDate = add(startDayOfTheMonth, { days: i });
      const dayOfWeek = getDay(targetDate);
      // 土日の場合スキップ
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        continue;
      }
      // 画面遷移で待機
      await sleep(3);
      let xpathStr = `/html/body/div/div[2]/div/div[5]/div[1]/table/tbody/tr[${(
        i + 1
      ).toString()}]/td[1]/p/select/option[2]`;
      // 打刻編集画面に入る
      await driver.findElement(By.xpath(xpathStr)).click();
      // 画面遷移で待機
      await sleep(3);
      // 打刻編集画面で、打刻をしていく
      //出勤
      await driver
        .findElement(By.xpath('//*[@id="recording_type_code_1"]/option[2]'))
        .click();
      //退勤
      await driver
        .findElement(By.xpath('//*[@id="recording_type_code_2"]/option[3]'))
        .click();
      await driver
        .findElement(By.id("recording_timestamp_time_1"))
        .sendKeys("0900");
      await driver
        .findElement(By.id("recording_timestamp_time_2"))
        .sendKeys(endTime[Math.floor(Math.random() * 20)], Key.ENTER);
      await sleep(3);
    }
  } catch (e) {
    console.log("エラーだよ");
    console.log(e);
  } finally {
    driver.quit();
    console.log("終わり");
  }
};
dakoku();
