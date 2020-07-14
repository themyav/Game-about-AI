import pygame
import colors as cl


FPS = 60
W = 300
H = 300

pygame.init()

print(pygame.font.get_fonts())


win = pygame.display.set_mode((300, 300))
pygame.display.set_caption('Who is AI?')
win.fill(cl.AQUAMARINE)
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
        print_text(message, x + 39, y + 7)


def show_menu():
    global FPS
    menu_background = pygame.image.load('menu.png')
    show = True
    start_button = Button(150, 50, cl.AQUAMARINE, cl.PINK)
    quit_button = Button(150, 50, cl.AQUAMARINE, cl.PINK)
    while show:
        for i in pygame.event.get():
            if i.type == pygame.QUIT:
                pygame.quit()
                quit()

        win.blit(menu_background, (0, 0))
        start_button.draw(70, 20, 'Start', start_game)
        quit_button.draw(70, 220, 'Quit', quit)
        pygame.display.update()
    #clock.tick(FPS)

def print_text(message, x, y, font_color = cl.BLACK, font_type = 'centurygothic', font_size = 30):
    main_font = pygame.font.SysFont(font_type, font_size)
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
        button.draw(60, 20)
        print_text("Hello", 100, 100)
        pygame.display.update()

show_menu()