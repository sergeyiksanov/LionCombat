import asyncio
import logging
import sys
from os import getenv

from aiogram import Bot, Dispatcher, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup, MenuButtonWebApp

TOKEN = "7543305003:AAGASwXKaqJK-whZuFY82oZ9XdSVKhhycDE"

dp = Dispatcher()

dp.message(CommandStart())


@dp.message(CommandStart())
async def command_start_handler(message: Message, bot: Bot) -> None:

    # await bot.set_chat_menu_button(
    #     chat_id=message.chat.id,
    #     menu_button=MenuButtonWebApp(text="Open", web_app=WebAppInfo(url="https://lioncombat.hopto.org/"))
    # )
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Тапаем братья", web_app=WebAppInfo(url="https://lioncombat.hopto.org/"))]
    ])
    await message.answer("Это игра Lion Kombat! Нажимай на льва и зарабатывай за это коины. Твоя цель - возглавить рейтинг! Удачи!!!", reply_markup=kb)


async def main() -> None:
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
