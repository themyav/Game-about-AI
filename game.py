# -*- coding: utf-8 -*
import pygame
import colors as cl
import fonts as ft
#import show_info


FPS = 60
W = 800
H = 600
open_info = False #костыль
play = False

pygame.init()

print(pygame.font.get_fonts())


win = pygame.display.set_mode((W, H))
pygame.display.set_caption('Who is AI?')
win.fill(cl.VIOLET)
pygame.display.update()


class Button():
    def __init__(self, w, h, inactive_color, active_color, font_type = ft.CENTURYGOTHIC, font_size = 20,
                 font_color = cl.WHITE, is_bold = False, is_italic = False, show_info = False, info_message = ''):
        self.w = w
        self.h = h
        self.inactive_color = inactive_color
        self.active_color = active_color
        self.font_type = font_type
        self.font_size = font_size
        self.is_bold = is_bold
        self.is_italic = is_italic
        self.font_color = font_color
        self.show_info = show_info
        self.info_message = info_message

    def draw(self, x, y, message = 'Button', action = None, w_shift = 10, h_shift = 7):
        mouse = pygame.mouse.get_pos()
        click = pygame.mouse.get_pressed()
        if x < mouse[0] < x + self.w and y < mouse[1] < y + self.h:
            pygame.draw.rect(win, self.active_color, (x, y, self.w, self.h))
            if self.show_info:
                pygame.draw.rect(win, cl.PALEVIOLETRED, (x, y + self.h + 10, self.w, self.h))
                print_text(self.info_message, x + w_shift, y + self.h + 10 + h_shift, self.font_color, self.font_type, self.font_size - 2)
            if click[0] == 1 and action is not None:
                action()
        else:
            pygame.draw.rect(win, self.inactive_color, (x, y, self.w, self.h))
        print_text(message, x + w_shift, y + h_shift, self.font_color, self.font_type, self.font_size, self.is_bold, self.is_italic)

def quit_info():
    global open_info
    open_info = False

def show_info():
    info_win = pygame.image.load('info_back.png')
    global open_info
    open_info = True
    close_info_button = Button(110, 60, cl.CORAL, cl.LIGHTSALMON, ft.CONSOLAS, 50)
    while open_info:
        for i in pygame.event.get():
            if i.type == pygame.QUIT:
                return
        win.blit(info_win, (0, 0))
        close_info_button.draw(W // 2 - 80, 400, 'OK', quit_info, 25, 10)
        info_file = open('info.txt')
        #info_text = info_file.readlines()
        inf_y = 80
        for i in info_file:
            print_text(i, 50, inf_y, cl.GHOSTWHITE, ft.CONSOLAS, 18, True)
            inf_y += 20
            #нужно избавиться от переводов строк
        pygame.display.update()

def show_menu():
    global FPS
    menu_background = pygame.image.load('new_menu.png')
    show = True
    start_button = Button(150, 50, cl.DEEPSKYBLUE, cl.POWDERBLUE, ft.CONSOLAS, 30, cl.GHOSTWHITE)
    quit_button = Button(150, 50, cl.DEEPSKYBLUE, cl.POWDERBLUE, ft.CONSOLAS, 30, cl.GHOSTWHITE)
    info_button = Button(150, 50, cl.DEEPSKYBLUE, cl.POWDERBLUE, ft.CONSOLAS, 30, cl.GHOSTWHITE)
    while show:
        for i in pygame.event.get():
            if i.type == pygame.QUIT:
                pygame.quit()
                quit()

        win.blit(menu_background, (0, 0))
        start_button.draw(W // 3 - 75, 380, 'Start', game_cycle, 40)
        quit_button.draw(W // 3 * 2 - 75, 380, 'Quit', quit, 40)
        info_button.draw(W // 2 - 75, 480, 'Info', show_info, 40)
        print_text('Game about AI', W // 2 - 200, 150, cl.POWDERBLUE, 'centurygothic', 50, True)
        pygame.display.update()
    #clock.tick(FPS)

def print_text(message, x, y, font_color = cl.BLACK, font_type = 'centurygothic', font_size = 30, is_bold = False, is_italic = False):
    main_font = pygame.font.SysFont(font_type, font_size, is_bold, is_italic)
    text = main_font.render(message, True, font_color)
    win.blit(text, (x, y))

def return_to_menu():
    global play
    play = False

def redraw_window():
    win.fill(cl.AZURE)
    button = Button(150, 40, cl.CORAL, cl.PINK, ft.CONSOLAS, 16, cl.GHOSTWHITE, True)
    button.draw(W // 3 * 3 - 200, 50, 'Return to menu', return_to_menu)
    print_text("Hello", W // 2 - 40, 200)
    block_1 = pygame.draw.rect(win, cl.SLATEBLUE, (W // 3 - 200, 150, 150, 150))
    block_2 = pygame.draw.rect(win, cl.SLATEBLUE, (W // 3 * 2 - 200, 150, 150, 150))
    block_3 = pygame.draw.rect(win, cl.SLATEBLUE, (W // 3 * 3 - 200, 150, 150, 150))
    button_block_1 = Button(150, 50, cl.TURQUOISE, cl.PALETURQUOISE, ft.CONSOLAS, 20, cl.GHOSTWHITE, 1, 0, 1, 'Your progress:')
    button_block_2 = Button(150, 50, cl.TURQUOISE, cl.PALETURQUOISE, ft.CONSOLAS, 20, cl.GHOSTWHITE, 1, 0, 1, 'Your progress:')
    button_block_3 = Button(150, 50, cl.TURQUOISE, cl.PALETURQUOISE, ft.CONSOLAS, 20, cl.GHOSTWHITE, 1, 0, 1, 'Your progress:')
    #в дальнейшем будет функция получения прогресса в конкретной игре
    button_block_1.draw(W // 3 - 200, 330, 'Start game 1', None)
    button_block_1.draw(W // 3 * 2 - 200, 330, 'Start game 2', None)
    button_block_1.draw(W // 3 * 3 - 200, 330, 'Start game 3', None)


def game_cycle():
    global play
    play = True
    while play:
        for i in pygame.event.get():
            if i.type == pygame.QUIT:
                return
        redraw_window()
        pygame.display.update()

show_menu()