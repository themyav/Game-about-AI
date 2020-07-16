import pygame
import colors as cl
import fonts as ft
#import show_info


FPS = 60
W = 800
H = 600

pygame.init()

print(pygame.font.get_fonts())


win = pygame.display.set_mode((W, H))
pygame.display.set_caption('Who is AI?')
win.fill(cl.VIOLET)
pygame.display.update()


class Button():
    def __init__(self, w, h, inactive_color, active_color, font_size = 20):
        self.w = w
        self.h = h
        self.inactive_color = inactive_color
        self.active_color = active_color

    def draw(self, x, y, message = 'Button', action = None):
        mouse = pygame.mouse.get_pos()
        click = pygame.mouse.get_pressed()
        if x < mouse[0] < x + self.w and y < mouse[1] < y + self.h:
            pygame.draw.rect(win, self.active_color, (x, y, self.w, self.h))
            if click[0] == 1 and action is not None:
                action()
        else:
            pygame.draw.rect(win, self.inactive_color, (x, y, self.w, self.h))
        print_text(message, x + self.w // 3 - 5, y + 7)

def show_info():
    info_win = pygame.image.load('info_back.png')
    open_info = True
    while open_info:
        for i in pygame.event.get():
            if i.type == pygame.QUIT:
                return
        win.blit(info_win, (0, 0))
        info_file = open('info.txt')
        info_text = info_file.readlines()
        inf_y = 50
        for i in info_text:
            print_text(i, 50, inf_y, cl.GHOSTWHITE, ft.CONSOLAS, 20, True)
            inf_y += 20
            #нужно избавиться от переводов строк
        pygame.display.update()

def show_menu():
    global FPS
    menu_background = pygame.image.load('new_menu.png')
    show = True
    start_button = Button(150, 50, cl.DEEPSKYBLUE, cl.POWDERBLUE)
    quit_button = Button(150, 50, cl.DEEPSKYBLUE, cl.POWDERBLUE)
    info_button = Button(150, 50, cl.DEEPSKYBLUE, cl.POWDERBLUE)
    while show:
        for i in pygame.event.get():
            if i.type == pygame.QUIT:
                pygame.quit()
                quit()

        win.blit(menu_background, (0, 0))
        start_button.draw(W // 3 - 75, 380, 'Start', start_game)
        quit_button.draw(W // 3 * 2 - 75, 380, 'Quit', quit)
        info_button.draw(W // 2 - 75, 480, 'Info', show_info)
        print_text('Game about AI', W // 2 - 200, 150, cl.POWDERBLUE, 'centurygothic', 50, True)
        pygame.display.update()
    #clock.tick(FPS)

def print_text(message, x, y, font_color = cl.BLACK, font_type = 'centurygothic', font_size = 30, is_bold = False, is_italic = False):
    main_font = pygame.font.SysFont(font_type, font_size, is_bold, is_italic)
    text = main_font.render(message, True, font_color)
    win.blit(text, (x, y))



def start_game():
    cur = 0
    while game_cycle():
        cur+=1

def game_cycle():
    play = True
    button = Button(170, 50, cl.CORAL, cl.PINK)
    while play:
        for i in pygame.event.get():
            if i.type == pygame.QUIT:
                #pygame.quit()
                #quit()
                #если вместо последних двух строчек писать return, то будет возврат в меню
                return
        win.fill(cl.AZURE)
        button.draw(W // 2 - 85, 100)
        print_text("Hello", W // 2 - 40, 200)
        pygame.display.update()

show_menu()