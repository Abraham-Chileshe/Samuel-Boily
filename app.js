/**
 * Samuel Mathieu Boily - Student Portfolio Interactive Logic
 * Progkids Coding Academy
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Navbar Scroll Effect & Active Link Highlight
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Project Filter System
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Project Code Snippets Database
  const projectCodeData = {
    pyramid: {
      title: "Stepped Pyramid & Grand Temple Generator",
      lang: "PYTHON 3 (MINECRAFT WORLD API)",
      description: "",
      code: `import mc
from mc import world

AIR              = (0,   0)
SAND             = (12,  0)
SANDSTONE        = (24,  0) 
SANDSTONE_SMOOTH = (24,  2)   
SANDSTONE_CHISELED=(24,  1)  
STONE_SLAB       = (44,  1)   
SANDSTONE_STAIRS = (128, 0)  
GOLD_BLOCK       = (41,  0)
DIAMOND_BLOCK    = (57,  0)
OBSIDIAN         = (49,  0)
GLOWSTONE        = (89,  0)
TORCH            = (50,  5)
CHEST            = (54,  0)
IRON_BARS        = (101, 0)
GRAVEL           = (13,  0)
STONE_PRESSURE   = (70,  0)
TNT              = (46,  0)
COBWEB           = (30,  0)
LADDER           = (65,  2)
BOOKSHELF        = (47,  0)
SOUL_SAND        = (88,  0)
NETHERRACK       = (87,  0)
WATER            = (9,   0)
CACTUS           = (81,  0)
DOOR             = (64,  0)


def fill(x0, y0, z0, x1, y1, z1, block):
    world.setCuboid(x0, y0, z0, x1, y1, z1, block[0], block[1])

def place(x, y, z, block):
    world.setBlock(x, y, z, block[0], block[1])

def clearField():
    fill(-63, 0, -63, 63, 125, 63, AIR)
    fill(-63, -1, -63, 63, -1, 63, SAND)

def buildSteppedPyramid():
    """
    40 tiers, each 2 blocks tall, stepping in 1 block per side.
    Outer vertical face = SANDSTONE_SMOOTH
    Top ledge           = SANDSTONE_CHISELED (decorative edge)
    Interior fill       = SANDSTONE
    """
    half = 40   # half-width of base
    for tier in range(half):
        s = half - tier          # half-width of this tier
        y_bot = tier * 2         # bottom y of this tier
        y_top = y_bot + 1        # top y of this tier (2 blocks tall)

        # Solid fill (interior sandstone)
        fill(-s, y_bot, -s, s, y_top, s, SANDSTONE)

        # Smooth sandstone outer face on all four vertical sides
        fill(-s, y_bot, -s,  s, y_top, -s, SANDSTONE_SMOOTH)   # north face
        fill(-s, y_bot,  s,  s, y_top,  s, SANDSTONE_SMOOTH)   # south face
        fill(-s, y_bot, -s, -s, y_top,  s, SANDSTONE_SMOOTH)   # west face
        fill( s, y_bot, -s,  s, y_top,  s, SANDSTONE_SMOOTH)   # east face

        # Chiselled ledge along the top edge of each tier
        fill(-s, y_top, -s,  s, y_top, -s, SANDSTONE_CHISELED)
        fill(-s, y_top,  s,  s, y_top,  s, SANDSTONE_CHISELED)
        fill(-s, y_top, -s, -s, y_top,  s, SANDSTONE_CHISELED)
        fill( s, y_top, -s,  s, y_top,  s, SANDSTONE_CHISELED)

    # Smooth capstone at the very top (tiers end at y=79, cap at y=80)
    fill(-1, 80, -1, 1, 82, 1, SANDSTONE_SMOOTH)
    place(0, 83, 0, GOLD_BLOCK)   # gold tip

def buildStaircasesOnFaces():
    """
    Central staircase cut into each of the four faces,
    running from ground to the top tier.
    Sandstone stairs blocks give the stepped-ramp look.
    Data values: 0=east, 1=west, 2=south, 3=north (ascending direction)
    """
    half = 40
    for tier in range(half):
        s    = half - tier
        y    = tier * 2
        mid  = 0   # center of pyramid

        # North face staircase (player walks south = up, data=2)
        place(mid, y, -s, (128, 2))
        place(mid, y, -s+1, (128, 2))

        # South face staircase (player walks north = up, data=3)
        place(mid, y,  s,   (128, 3))
        place(mid, y,  s-1, (128, 3))

        # West face staircase (player walks east = up, data=0)
        place(-s,  y, mid, (128, 0))
        place(-s+1,y, mid, (128, 0))

        # East face staircase (player walks west = up, data=1)
        place( s,  y, mid, (128, 1))
        place( s-1,y, mid, (128, 1))

def buildEntranceTemple():
    """
    Grand entrance temple at the north face base, matching the
    screenshot: a rectangular gatehouse with pillars, a wide
    porch, and steps leading up to the pyramid doorway.
    """
    # ── Raised platform / porch ──────────────────────────────
    fill(-12, 0, -52, 12, 1, -40, SANDSTONE_SMOOTH)
    # Platform top trim
    fill(-12, 1, -52, 12, 1, -52, SANDSTONE_CHISELED)
    fill(-12, 1, -40, 12, 1, -40, SANDSTONE_CHISELED)
    fill(-12, 1, -52,-12, 1, -40, SANDSTONE_CHISELED)
    fill( 12, 1, -52, 12, 1, -40, SANDSTONE_CHISELED)

    # ── Steps up to porch from ground level ──────────────────
    # 3 steps, each 1 block high, from z=-55 inward
    fill(-10,  0, -55, 10,  0, -55, SANDSTONE_SMOOTH)
    fill(-10,  1, -54, 10,  1, -54, SANDSTONE_SMOOTH)
    fill(-10,  2, -53, 10,  2, -53, SANDSTONE_SMOOTH)

    # ── Gatehouse walls ───────────────────────────────────────
    # Back wall (connects to pyramid face at z=-40)
    fill(-12, 2, -40, 12, 8, -40, SANDSTONE_SMOOTH)
    # Side walls
    fill(-12, 2, -50,-12, 8, -40, SANDSTONE_SMOOTH)
    fill( 12, 2, -50, 12, 8, -40, SANDSTONE_SMOOTH)
    # Roof
    fill(-12, 8, -50, 12, 8, -40, SANDSTONE_SMOOTH)
    # Chiselled cornice along roof edge
    fill(-12, 9, -50, 12, 9, -50, SANDSTONE_CHISELED)
    fill(-12, 9, -40, 12, 9, -40, SANDSTONE_CHISELED)
    fill(-12, 9, -50,-12, 9, -40, SANDSTONE_CHISELED)
    fill( 12, 9, -50, 12, 9, -40, SANDSTONE_CHISELED)

    # ── Doorway opening ───────────────────────────────────────
    fill(-3, 2, -50, 3, 7, -50, AIR)    # front gate
    fill(-3, 2, -40, 3, 7, -40, AIR)    # back gate (into pyramid)
    fill(-3, 2, -49, 3, 7, -41, AIR)    # hollow interior

    # ── Pillars (6 pillars on the front porch) ────────────────
    pillar_x = [-10, -6, -2, 2, 6, 10]
    for px in pillar_x:
        # Pillar shaft
        fill(px, 2, -50, px, 8, -50, SANDSTONE_CHISELED)
        # Capital (top) and base of pillar
        place(px, 9, -50, SANDSTONE_SMOOTH)
        place(px, 1, -50, SANDSTONE_SMOOTH)

    # ── Interior torches ──────────────────────────────────────
    place(-5, 6, -45, TORCH)
    place( 5, 6, -45, TORCH)
    place(-5, 6, -43, TORCH)
    place( 5, 6, -43, TORCH)

    # ── Flanking side wings (low walls either side of temple) ─
    fill(-24, 0, -50,-12, 3, -42, SANDSTONE_SMOOTH)
    fill( 12, 0, -50, 24, 3, -42, SANDSTONE_SMOOTH)
    # Wing top trim
    fill(-24, 3, -50,-12, 3, -42, SANDSTONE_CHISELED)
    fill( 12, 3, -50, 24, 3, -42, SANDSTONE_CHISELED)

    # ── Small obelisks flanking the entrance ──────────────────
    for ox in [-16, 16]:
        fill(ox, 0, -51, ox, 7, -51, SANDSTONE_SMOOTH)
        place(ox, 8, -51, SANDSTONE_CHISELED)
        place(ox, 9, -51, GOLD_BLOCK)

def buildSandBase():
    """Wide sand apron around the pyramid base"""
    fill(-50, -1, -63, 50, -1, -41, SAND)
    fill(-63, -1, -50, -41,-1,  50, SAND)
    fill( 41, -1, -50,  63,-1,  50, SAND)
    fill(-50, -1,  41,  50,-1,  63, SAND)
    
def mainArea ():
	fill(3,2,-39,-3,4,35,AIR)
	for i in range(-35,34,4):
		world.setBlock(4,3,i,50)
		world.setBlock(-4,3,i,50)
	
	#passage way
	fill(38,2,-33,4,3,-33,AIR)
	fill(38,2,-25,4,3,-25,AIR)
	fill(38,2,-17,4,3,-17,AIR)
	fill(38,2,-9,4,3,-9,AIR)
	fill(38,2,-1,4,3,-1,AIR)
	fill(38,2,7,4,3,7,AIR)
	fill(38,2,15,4,3,15,AIR)
	fill(38,2,23,4,3,23,AIR)
	fill(38,2,31,4,3,31,AIR)
	
	#doors
	place(4,2,-33,DOOR)
	place(4,2,-25,DOOR)
	place(4,2,-17,DOOR)
	place(4,2,-9,DOOR)
	place(4,2,-1,DOOR)
	place(4,2,7,DOOR)
	place(4,2,15,DOOR)
	place(4,2,23,DOOR)
	place(4,2,31,DOOR)
		
		
def rooms():
	#first room left
	x1 = -27
	x2 = -31
	x3 = -32
	for r in range (8):
		fill(27,2,x1,11,4,x2,AIR)
		place(11,2,x3,DOOR)
		x1 += 8
		x2 += 8
		x3 += 8
		
def parkour():
	pass
def buildAll():
    print("Clearing field...")
    clearField()
    print("Building stepped pyramid exterior...")
    buildSteppedPyramid()
    print("Carving face staircases...")
    buildEntranceTemple()
    
buildAll()

mainArea() 
rooms()`
    },
    snowman: {
      title: "Giant 3D Snowman Generator (Snap! Blocks)",
      lang: "MINECRAFT SNAP! VISUAL BLOCKS",
      image: "assets/snowmancode.jpg",
      description: "Samuel programmed this procedural 3D Snowman in Minecraft using Snap! visual block algorithms. It generates 3 concentric spherical tiers of decreasing radii, wooden arms, and bedrock facial details.",
      code: `// ==========================================
// Author: Samuel Mathieu Boily (Age 11)
// Course: Minecraft Visual Block Logic (Progkids)
// Project: Giant 3D Snowman Generator
// ==========================================

[SCRIPT 1: Snowman Body & Face]
[WHEN Flag CLICKED (START)]
  FILL WITH Block [Air] FROM (X: -63, Y: 0, Z: -63) TO (X: 63, Y: 125, Z: 63)
  FILL WITH Block [Snow block] FROM (X: -63, Y: -1, Z: -63) TO (X: 63, Y: -1, Z: 63)
  SPHERE: Radius (15) OF Block [Snow block] AT (X: 0, Y: 10, Z: 0)  // Bottom Base
  SPHERE: Radius (9)  OF Block [Snow block] AT (X: 0, Y: 26, Z: 0)  // Middle Torso
  SPHERE: Radius (5)  OF Block [Snow block] AT (X: 0, Y: 38, Z: 0)  // Head
  SET BLOCK Block [Bedrock] AT (X: -5, Y: 38, Z: 1)   // Right Eye
  SET BLOCK Block [Bedrock] AT (X: -5, Y: 38, Z: -1)  // Left Eye
  SET BLOCK Block [Bedrock] AT (X: -5, Y: 36, Z: 0)   // Nose / Mouth

[SCRIPT 2: Wooden Arms & Buttons]
[WHEN Flag CLICKED (START)]
  FILL WITH Block [Wood] FROM (X: 0, Y: 26, Z: 9)  TO (X: 2, Y: 24, Z: 20)  // Right Wooden Arm
  FILL WITH Block [Wood] FROM (X: 0, Y: 26, Z: -9) TO (X: 2, Y: 24, Z: -20) // Left Wooden Arm
  SET BLOCK Block [Bedrock] AT (X: -9,  Y: 26, Z: 0)  // Top Chest Button
  SET BLOCK Block [Bedrock] AT (X: -11, Y: 20, Z: 0)  // Middle Button
  SET BLOCK Block [Bedrock] AT (X: -15, Y: 13, Z: 0)  // Lower Body Button`
    },
    race: {
      title: "Ice Boat Racing Arena (Snap! Blocks)",
      lang: "MINECRAFT SNAP! VISUAL BLOCKS",
      image: "assets/racecode.jpg",
      description: "Samuel programmed this high-speed ice boat racing arena using Progkids Snap! visual blocks. It fills a massive 126x126 stadium with deep ocean water, installs slick ice tracks for maximum boat velocity, and erects 125-block tall sand stadium boundaries.",
      code: `// ==========================================
// Author: Samuel Mathieu Boily (Age 11)
// Course: Minecraft Visual Block Logic (Progkids)
// Project: Ice Boat Racing Arena
// ==========================================

[WHEN Flag CLICKED (START)]
  // 1. Fill Deep Water Reservoir
  FILL WITH Block [Water] FROM (X: -63, Y: 2, Z: -63) TO (X: 63, Y: -30, Z: 63)

  // 2. Lay Down High-Speed Slick Ice Racing Layer
  FILL WITH Block [Ice] FROM (X: -57, Y: 2, Z: -57) TO (X: 57, Y: 4, Z: 57)

  // 3. Build North Sand Boundary Wall (Height: 125)
  FILL WITH Block [Sand] FROM (X: -62, Y: 0, Z: -62) TO (X: 62, Y: 125, Z: -62)

  // 4. Build South Sand Boundary Wall
  FILL WITH Block [Sand] FROM (X: -62, Y: 0, Z: 62) TO (X: 62, Y: 125, Z: 62)

  // 5. Build East Sand Boundary Wall
  FILL WITH Block [Sand] FROM (X: 62, Y: 0, Z: -62) TO (X: 62, Y: 125, Z: 62)

  // 6. Build West Sand Boundary Wall
  FILL WITH Block [Sand] FROM (X: -62, Y: 0, Z: -62) TO (X: -62, Y: 125, Z: 62)`
    },
    hotel: {
      title: "Modern Hotel & Skyscraper Generator",
      lang: "PYTHON 3 (MINECRAFT WORLD API)",
      description: "Samuel developed this procedural Python algorithm to clear the construction lot and automatically construct a multi-wing modern hotel skyscraper with connecting skywalks, stairwells, and perimeter security fencing.",
      code: `import mc
from mc import world

def clear_field():
	world.setCuboid (-63,0,-63,63,125,63,0)
	world.setCuboid (-63,-1,-63,63,-1,63,66)
	world.setCuboid (-48,-1,36,48,-1,-20,44)
	

def skyscraper(size):
	y = 0
	for h in range (size):
		world.buildHome (0,y,-10,10,9,8,251)
		world.buildHome (10,y,-2,10,9,8,7)
		world.buildHome (-10,y,-2,10,9,8,7)
		world.buildHome (20,y,-2,10,9,8,251)
		world.buildHome (-20,y,-2,10,9,8,251)
		world.buildHome (-30,y,6,10,9,8,7)
		world.buildHome (30,y,6,10,9,8,7)
		world.buildHome (-40,y,14,10,9,8,251)
		world.buildHome (40,y,14,10,9,8,251)
		
		
		world.setCuboid (-25,y-1,3,-6,y-1,5,98)
		world.setCuboid (24,y-1,3,5,y-1,5,98)
		world.setCuboid (-5,y-1,5,-3,y-1,-5,98)
		world.setCuboid (4,y-1,5,2,y-1,-5,98)
		world.setCuboid (1,y-1,-5,-2,y-1,-3,98)
		
		#stairs
		world.setBlock (2,y,0,4)
		world.setBlock (2,y+1,-1,4)
		world.setBlock (2,y+2,-2,4)
		world.setBlock (1,y+3,-2,4)
		world.setBlock (0,y+4,-2,4)
		world.setBlock (-1,y+5,-2,4)
		world.setBlock (-2,y+6,-2,4)
		world.setBlock (-3,y+7,-2,4)
		y += 8

def fence(size):
	world.setCuboid (48,0,36,48,size,-20,85)
	world.setCuboid (-48,0,36,-6,size,36,85)
	world.setCuboid (5,0,36,48,size,36,85)
	world.setCuboid (-48,0,36,-48,size,-20,85)
		
clear_field()

skyscraper(3)

fence(3)`
    },
    mansion: {
      title: "Waterfront Modern Mansion & Secret Lab Generator",
      lang: "PYTHON 3 (MINECRAFT WORLD API)",
      description: "Samuel developed an interactive Python estate builder that prompts for custom building materials, builds a river crossing bridge, constructs a two-story modern house, fully furnishes rooms and lighting, and digs an underground tunnel leading to a secret underwater lab.",
      code: `import mc
from mc import world

house_block = input("enter block id for house")
bridge = input ("enter block id for bridge")
int(house_block)
int(bridge)
def clear_field():
	world.setCuboid (22,0,21,58,125,-24,0)
	world.setCuboid (-63,-1,-63,63,-1,63,2)

def lake():
	#river
	world.setCuboid (-15,-1,-63,15,-5,63,9)
	world.setCuboid (-16,-1,-63,-16,-5,63,12)
	world.setCuboid (16,-1,-63,16,-5,63,12)
	world.setCuboid (16,0,-63,16,0,63,85)
	#bridge
	world.setCuboid (-16,0,-6,16,0,6,bridge)
	world.setCuboid (-15,1,-6,15,1,6,bridge)
	world.setCuboid (-15,0,-6,15,0,6,0)
	#pillars(support)
	world.setCuboid (0,0,6,0,-5,6,4)
	world.setCuboid (0,0,-6,0,-5,-6,4)
	#fishes
	for fish in range(1):
		world.spawnCreature (10,-3,0,"SQUID")
		
		
	for i in range (-15,16,2):
		world.buildColumn (i,2,6,4,1)
		world.buildColumn (i,2,-6,4,1)
	
def house ():
	#foundation
	wall=house_block
	roof=45
	world.setCuboid (31,0,-20,55,0,13,17,1)#foundation
	world.setCuboid (55,0,-20,55,18,13,wall)#back wall
	world.setCuboid (31,0,13,55,18,13,wall)#right wall
	world.setCuboid (31,0,-20,55,18,-20,wall)#left wall
	world.setCuboid (31,9,-20,55,9,13,roof)#roof
	world.setCuboid (33,0,-20,33,8,3,wall)#front wall
	world.setCuboid (37,1,3,37,8,12,160,5)#lime window
	world.setCuboid (33,1,-20,33,8,-10,160,15)#big front window
	world.setCuboid (33,1,-6,33,8,-3,160,15)#small front window
	#second floor
	world.setCuboid (31,9,-20,31,18,-3,wall)
	world.setCuboid (40,9,-3,40,18,13,wall)
	world.setCuboid (39,9,-3,32,18,-3,wall)
	world.setCuboid (31,18,-20,55,18,13,roof)

	#first floor
	world.setCuboid (34,0,3,37,9,3,wall)
	world.setBlock (35,1,3,64)#door
	world.setBlock (34,1,3,64)#door
	
def living_room	():
	world.setCuboid (50,0,12,50,8,-2,251,13)#living room wall
	world.setCuboid (37,0,-2,49,8,-2,251,13)#living room wall
	world.setCuboid (49,0,12,38,0,-1,171,14)#carpet
	world.setBlock (41,8,1,124)#lamp
	world.setBlock (41,8,10,124)#lamp
	world.setTime (18000)
	world.setCuboid (49,1,4,49,3,7,251,15)#TV	
	world.setCuboid (49,0,3,49,0,8,47)#bookshelf
	world.setBlock (49,1,3,6)#sapling
	world.setBlock (49,1,8,6)#sapling
	world.setCuboid (42,0,5,42,0,8,35,13)#couch
	world.setCuboid (41,0,5,41,1,8,35,13)#couch
	world.setTime (6000)
	world.setCuboid (49,-2,12,38,-10,-1,0)
	world.setBlock (53,8,-1,124)#lamp
	world.setBlock (53,8,5,124)#lamp 
	world.setCuboid (34,1,-7,54,8,-7,251,13)
	
def pool ():
	#pool
	world.setCuboid (22,-1,-16,29,-1,-6,64)
	world.setCuboid (23,-1,-15,28,-10,-7,8) 

	
def stairs():
	#stairs
	stair=203
	world.setBlock (54,8,-19,stair)
	world.setBlock (53,7,-19,stair)
	world.setBlock (52,6,-19,stair)
	world.setBlock (51,5,-19,stair)
	world.setBlock (50,4,-19,stair)
	world.setBlock (49,3,-19,stair)
	world.setBlock (48,2,-19,stair)
	world.setBlock (47,1,-19,stair)
	world.setBlock (54,8,-18,stair)
	world.setBlock (53,7,-18,stair)
	world.setBlock (52,6,-18,stair)
	world.setBlock (51,5,-18,stair)
	world.setBlock (50,4,-18,stair)
	world.setBlock (49,3,-18,stair)
	world.setBlock (48,2,-18,stair)
	world.setBlock (47,1,-18,stair)
	
def first_floor_rooms():
	#wall
	world.setCuboid (43,0,-19,43,8,-8,251,13)
	world.setBlock (42,1,-7,64)
	world.setBlock (52,1,-7,64)
	
def big_tv_room():
	world.setCuboid (36,2,-19,40,5,-19,251,15)
	world.setBlock (39,8,-12,124)
	world.setBlock (39,8,-18,124)
	world.setCuboid (34,0,-19,42,0,-8,171,14)
	world.setBlock (34,0,-19,145)
	world.buildColumn (42,-11,-8,10,0)
	world.setCuboid (42,-11,-8,42,-9,-1,0)
	world.setCuboid (42,-2,-8,34,-4,-8,0)
	world.buildColumn (34,-4,-8,4,0)
	world.setBlock (34,0,-8,96)
	
def tunnel():
	world.setCuboid (38,-10,12,-63,-8,10,0)
	world.setCuboid (15,-8,12,-14,-6,10,0)
	world.setCuboid (15,-6,12,-14,-6,10,20)
	
	#lab
	world.setCuboid (-58,-10,5,-63,-7,-1,0)
	world.setCuboid (-58,-10,5,-63,-10,-1,171,14)
	world.setCuboid (-58,-7,5,-63,-7,-1,9)
	world.setCuboid (-62,-10,6,-62,-8,9,0)
	
def bedroom_1():
	world.setCuboid (54,0,3,51,9,3,251,13)
	world.setBlock (52,1,3,64)
	

#run boxes
clear_field()
lake()
house()
living_room()
tunnel()
pool()
stairs()
first_floor_rooms()
big_tv_room()
bedroom_1 ()`
    }
  };

  // 5. Code Modal Logic
  const codeModal = document.getElementById('codeModal');
  const closeCodeModalBtn = document.getElementById('closeCodeModalBtn');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectDesc = document.getElementById('modalProjectDesc');
  const modalCodeLang = document.getElementById('modalCodeLang');
  const modalCodeSnippet = document.getElementById('modalCodeSnippet');
  const modalCodeImageWrap = document.getElementById('modalCodeImageWrap');
  const modalCodeImage = document.getElementById('modalCodeImage');
  const modalCodeImageLink = document.getElementById('modalCodeImageLink');
  const copyCodeBtn = document.getElementById('copyCodeBtn');

  document.querySelectorAll('.view-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = projectCodeData[projectId];
      if (data) {
        modalProjectTitle.textContent = data.title;
        modalProjectDesc.textContent = data.description;
        modalCodeLang.textContent = data.lang;
        modalCodeSnippet.textContent = data.code;

        // Visual Block Image snapshot if available
        if (data.image && modalCodeImage && modalCodeImageWrap) {
          modalCodeImage.src = data.image;
          if (modalCodeImageLink) modalCodeImageLink.href = data.image;
          modalCodeImageWrap.style.display = 'block';
        } else if (modalCodeImageWrap) {
          modalCodeImageWrap.style.display = 'none';
        }

        codeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeCodeModalBtn) {
    closeCodeModalBtn.addEventListener('click', () => {
      codeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // Copy Code Button
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const textToCopy = modalCodeSnippet.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyCodeBtn.innerHTML;
        copyCodeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyCodeBtn.style.background = '#10b981';
        setTimeout(() => {
          copyCodeBtn.innerHTML = originalText;
          copyCodeBtn.style.background = '';
        }, 2000);
      });
    });
  }

  // 6. YouTube Video Modal Player
  const videoModal = document.getElementById('videoModal');
  const openClipModalBtn = document.getElementById('openClipModalBtn');
  const playLessonBtn = document.getElementById('playLessonBtn');
  const closeVideoModalBtn = document.getElementById('closeVideoModalBtn');
  const youtubeIframe = document.getElementById('youtubeIframe');
  const standardYoutubeEmbed = "https://www.youtube.com/embed/aQe2pDLjst8?si=1dPYl2VakcKNK9u8";

  function openVideoModal() {
    if (youtubeIframe) {
      youtubeIframe.src = standardYoutubeEmbed + "&autoplay=1";
    }
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (youtubeIframe) {
      youtubeIframe.src = standardYoutubeEmbed; // Reset and pause
    }
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (openClipModalBtn) openClipModalBtn.addEventListener('click', openVideoModal);
  if (playLessonBtn) playLessonBtn.addEventListener('click', openVideoModal);
  if (closeVideoModalBtn) closeVideoModalBtn.addEventListener('click', closeVideoModal);

  // Close modals on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === codeModal) {
      codeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
    if (e.target === videoModal) {
      closeVideoModal();
    }
    const lightboxModal = document.getElementById('lightboxModal');
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // 8. Gallery Lightbox Logic
  const lightboxModal = document.getElementById('lightboxModal');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const caption = item.getAttribute('data-caption');
      const titleElem = item.querySelector('.gallery-caption h4');
      const titleText = titleElem ? titleElem.textContent : 'Photo Preview';

      if (lightboxImage && lightboxModal) {
        lightboxImage.src = imgSrc;
        if (lightboxTitle) lightboxTitle.textContent = titleText;
        if (lightboxCaption) lightboxCaption.textContent = caption || '';
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeLightboxBtn && lightboxModal) {
    closeLightboxBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // Close modals with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (codeModal) codeModal.classList.remove('active');
      if (videoModal) closeVideoModal();
      if (lightboxModal) lightboxModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // 7. Animated Number Counters on Scroll
  const statElements = document.querySelectorAll('.stat-num');
  let animated = false;

  function runCounters() {
    statElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1500;
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + '+';
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + '+';
        }
      }, stepTime);
    });
  }

  // Trigger counters when hero stats are in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounters();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats-bar');
  if (heroStats) {
    observer.observe(heroStats);
  }
});
