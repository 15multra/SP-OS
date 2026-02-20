CC = gcc
AS = nasm
LD = ld
CFLAGS = -m32 -c -ffreestanding -fno-stack-protector -O0 -Wall
ASFLAGS = -f elf32
LDFLAGS = -m elf_i386 -T link.ld

all: kernel-sjmarco

kernel-sjmarco: kernel.o kasm.o
	$(LD) $(LDFLAGS) -o kernel-sjmarco kernel.o kasm.o

kernel.o: kernel.c
	$(CC) $(CFLAGS) kernel.c -o kernel.o

kasm.o: kernel.asm
	$(AS) $(ASFLAGS) kernel.asm -o kasm.o

clean:
	rm -f *.o kernel-sjmarco
