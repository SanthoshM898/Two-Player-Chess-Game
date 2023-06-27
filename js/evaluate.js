//Determine the conditional power of pieces
var RookOpenFile = 10;
var RookSemiOpenFile = 5;
var QueenOpenFile = 5;
var QueenSemiOpenFile = 3;
var BishopPair = 30;
var PawnIsolated = -10;
var PawnPassed = [ 0, 5, 10, 20, 35, 60, 100, 200 ]; //power of passed pawn at each file

var PawnRanksWhite = new Array(10);
var PawnRanksBlack = new Array(10);


//Determine the positional power of each piece
var PawnTable = [
0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	,
10	,	10	,	0	,	-10	,	-10	,	0	,	10	,	10	,
5	,	0	,	0	,	5	,	5	,	0	,	0	,	5	,
0	,	0	,	10	,	20	,	20	,	10	,	0	,	0	,
5	,	5	,	5	,	10	,	10	,	5	,	5	,	5	,
10	,	10	,	10	,	20	,	20	,	10	,	10	,	10	,
20	,	20	,	20	,	30	,	30	,	20	,	20	,	20	,
0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	
];
var KnightTable = [
0	,	-10	,	0	,	0	,	0	,	0	,	-10	,	0	,
0	,	0	,	0	,	5	,	5	,	0	,	0	,	0	,
0	,	0	,	10	,	10	,	10	,	10	,	0	,	0	,
0	,	0	,	10	,	20	,	20	,	10	,	5	,	0	,
5	,	10	,	15	,	20	,	20	,	15	,	10	,	5	,
5	,	10	,	10	,	20	,	20	,	10	,	10	,	5	,
0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
0	,	0	,	0	,	0	,	0	,	0	,	0	,	0		
];
var BishopTable = [
0	,	0	,	-10	,	0	,	0	,	-10	,	0	,	0	,
0	,	0	,	0	,	10	,	10	,	0	,	0	,	0	,
0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
0	,	0	,	0	,	10	,	10	,	0	,	0	,	0	,
0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	
];
var RookTable = [
0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
25	,	25	,	25	,	25	,	25	,	25	,	25	,	25	,
0	,	0	,	5	,	10	,	10	,	5	,	0	,	0		
];
var KingE = [	
	-50	,	-10	,	0	,	0	,	0	,	0	,	-10	,	-50	,
	-10,	0	,	10	,	10	,	10	,	10	,	0	,	-10	,
	0	,	10	,	20	,	20	,	20	,	20	,	10	,	0	,
	0	,	10	,	20	,	40	,	40	,	20	,	10	,	0	,
	0	,	10	,	20	,	40	,	40	,	20	,	10	,	0	,
	0	,	10	,	20	,	20	,	20	,	20	,	10	,	0	,
	-10,	0	,	10	,	10	,	10	,	10	,	0	,	-10	,
	-50	,	-10	,	0	,	0	,	0	,	0	,	-10	,	-50	
];

var KingO = [	
	0	,	5	,	5	,	-10	,	-10	,	0	,	10	,	5	,
	-30	,	-30	,	-30	,	-30	,	-30	,	-30	,	-30	,	-30	,
	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70		
];

function MaterialDraw() {
    if (0 == brd_pceNum[PIECES.wR] && 0 == brd_pceNum[PIECES.bR] && 0 == brd_pceNum[PIECES.wQ] && 0 == brd_pceNum[PIECES.bQ]) {
	  	if (0 == brd_pceNum[PIECES.bB] && 0 == brd_pceNum[PIECES.wB]){
	      	if (brd_pceNum[PIECES.wN] < 3 && brd_pceNum[PIECES.bN] < 3) {
			  	return BOOL.TRUE; //Draw if black and white knight<3, no bishops, rooks and queens on board 
			}
	  	} 
		else if (0 == brd_pceNum[PIECES.wN] && 0 == brd_pceNum[PIECES.bN]) 
		{
	     	if (Math.abs(brd_pceNum[PIECES.wB] - brd_pceNum[PIECES.bB]) < 2) { 
				return BOOL.TRUE; //Draw if one colour has two or more bishops than the other, given no knights, rooks and queens
			}
	  	} 
		else if ((brd_pceNum[PIECES.wN] < 3 && 0 == brd_pceNum[PIECES.wB]) || (brd_pceNum[PIECES.wB] == 1 && 0 == brd_pceNum[PIECES.wN])) {
	    	if ((brd_pceNum[PIECES.bN] < 3 && 0 == brd_pceNum[PIECES.bB]) || (brd_pceNum[PIECES.bB] == 1 && 0 == brd_pceNum[PIECES.bN])){
				return BOOL.TRUE; //Draw if both black and white have either (two or less knights) or (one bishop bishops), given no rooks and queens
			}
	  	}
	} 
	else if (0 == brd_pceNum[PIECES.wQ] && 0 == brd_pceNum[PIECES.bQ]) {
        if (brd_pceNum[PIECES.wR] == 1 && brd_pceNum[PIECES.bR] == 1) {
            if ((brd_pceNum[PIECES.wN] + brd_pceNum[PIECES.wB]) < 2 && (brd_pceNum[PIECES.bN] + brd_pceNum[PIECES.bB]) < 2)	
			{ 
				return BOOL.TRUE; //Draw when you both have one rook and either a bishop or a knight, given no queen.
			}
        } 
		else if (brd_pceNum[PIECES.wR] == 1 && 0 == brd_pceNum[PIECES.bR]) {
            if ((brd_pceNum[PIECES.wN] + brd_pceNum[PIECES.wB] == 0) && (((brd_pceNum[PIECES.bN] + brd_pceNum[PIECES.bB]) == 1) || ((brd_pceNum[PIECES.bN] + brd_pceNum[PIECES.bB]) == 2))) {
				return BOOL.TRUE; //Draw when white has one rook and black has one or two bishops or knights, given no queen
			}
        } 
		else if (brd_pceNum[PIECES.bR] == 1 && 0 == brd_pceNum[PIECES.wR]) {
            if ((brd_pceNum[PIECES.bN] + brd_pceNum[PIECES.bB] == 0) && (((brd_pceNum[PIECES.wN] + brd_pceNum[PIECES.wB]) == 1) || ((brd_pceNum[PIECES.wN] + brd_pceNum[PIECES.wB]) == 2))) { 
				return BOOL.TRUE; //Draw when black has one rook and white has one or two bishops or knights, given no queen
			}
        }
    }
  	return BOOL.FALSE; //As none of the draw conditions are satisfied, it's not a draw yet.
}

var ENDGAME_MAT = 1 * PieceVal[PIECES.wR] + 2 * PieceVal[PIECES.wN] + 2 * PieceVal[PIECES.wP] + PieceVal[PIECES.wK];

function PawnsInit() {
	var index = 0;
	// Set the initial pawn ranks for all files to their respective starting ranks.
	for(index = 0; index < 10; ++index) {				
		PawnRanksWhite[index] = RANKS.RANK_8;			
		PawnRanksBlack[index] = RANKS.RANK_1;
	}
	// Update the pawn ranks based on the actual positions of white pawns.
	pce = PIECES.wP;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		if(RanksBrd[sq] < PawnRanksWhite[FilesBrd[sq]+1]) {
			PawnRanksWhite[FilesBrd[sq]+1] = RanksBrd[sq];
		}
	}	
	pce = PIECES.bP;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		if(RanksBrd[sq] > PawnRanksBlack[FilesBrd[sq]+1]) {
			PawnRanksBlack[FilesBrd[sq]+1] = RanksBrd[sq];
		}			
	}	
}

function EvalPosition() {
	var pce;
	var pceNum;
	var sq;
	var score = brd_material[COLOURS.WHITE] - brd_material[COLOURS.BLACK];
	var file;
	var rank;
	if(0 == brd_pceNum[PIECES.wP] && 0 == brd_pceNum[PIECES.bP] && MaterialDraw() == BOOL.TRUE) {
		return 0;
	}
	
	PawnsInit();
	
	pce = PIECES.wP;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		score += PawnTable[SQ64(sq)];	
		file = FilesBrd[sq]+1;
		rank = RanksBrd[sq];
		if(PawnRanksWhite[file-1]==RANKS.RANK_8 && PawnRanksWhite[file+1]==RANKS.RANK_8) {
			score += PawnIsolated;
		}
		
		if(PawnRanksBlack[file-1]<=rank && PawnRanksBlack[file]<=rank && PawnRanksBlack[file+1]<=rank) {
			score += PawnPassed[rank];
		}
	}	

	pce = PIECES.bP;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		score -= PawnTable[MIRROR64(SQ64(sq))];	
		file = FilesBrd[sq]+1;
		rank = RanksBrd[sq];
		if(PawnRanksBlack[file-1]==RANKS.RANK_1 && PawnRanksBlack[file+1]==RANKS.RANK_1) {
			score -= PawnIsolated;
		}	
		
		if(PawnRanksWhite[file-1]>=rank && PawnRanksWhite[file]>=rank && PawnRanksWhite[file+1]>=rank) {
			score -= PawnPassed[7-rank];
		}	
	}	
	
	pce = PIECES.wN;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		score += KnightTable[SQ64(sq)];
	}	

	pce = PIECES.bN;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		score -= KnightTable[MIRROR64(SQ64(sq))];
	}			
	
	pce = PIECES.wB;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		score += BishopTable[SQ64(sq)];
	}	

	pce = PIECES.bB;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		score -= BishopTable[MIRROR64(SQ64(sq))];
	}	

	pce = PIECES.wR;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		score += RookTable[SQ64(sq)];	
		file = FilesBrd[sq]+1;
		if(PawnRanksWhite[file]==RANKS.RANK_8) {
			if(PawnRanksBlack[file]==RANKS.RANK_1) {
				score += RookOpenFile;
			} else  {
				score += RookSemiOpenFile;
			}
		}
	}	

	pce = PIECES.bR;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		score -= RookTable[MIRROR64(SQ64(sq))];	
		file = FilesBrd[sq]+1;
		if(PawnRanksBlack[file]==RANKS.RANK_1) {
			if(PawnRanksWhite[file]==RANKS.RANK_8) {
				score -= RookOpenFile;
			} else  {
				score -= RookSemiOpenFile;
			}
		}
	}
	
	pce = PIECES.wQ;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		score += RookTable[SQ64(sq)];	
		file = FilesBrd[sq]+1;
		if(PawnRanksWhite[file]==RANKS.RANK_8) {
			if(PawnRanksBlack[file]==RANKS.RANK_1) {
				score += QueenOpenFile;
			} else  {
				score += QueenSemiOpenFile;
			}
		}
	}	

	pce = PIECES.bQ;	
	for(pceNum = 0; pceNum < brd_pceNum[pce]; ++pceNum) {
		sq = brd_pList[PCEINDEX(pce,pceNum)];
		score -= RookTable[MIRROR64(SQ64(sq))];	
		file = FilesBrd[sq]+1;
		if(PawnRanksBlack[file]==RANKS.RANK_1) {
			if(PawnRanksWhite[file]==RANKS.RANK_8) {
				score -= QueenOpenFile;
			} else  {
				score -= QueenSemiOpenFile;
			}
		}
	}	
	
	pce = PIECES.wK;
	sq = brd_pList[PCEINDEX(pce,0)];
	
	if( (brd_material[COLOURS.BLACK] <= ENDGAME_MAT) ) {
		score += KingE[SQ64(sq)];
	} else {
		score += KingO[SQ64(sq)];
	}
	
	pce = PIECES.bK;
	sq = brd_pList[PCEINDEX(pce,0)];
	
	if( (brd_material[COLOURS.WHITE] <= ENDGAME_MAT) ) {
		score -= KingE[MIRROR64(SQ64(sq))];
	} else {
		score -= KingO[MIRROR64(SQ64(sq))];
	}
	
	if(brd_pceNum[PIECES.wB] >= 2) score += BishopPair;
	if(brd_pceNum[PIECES.bB] >= 2) score -= BishopPair;
	
	if(brd_side == COLOURS.WHITE) {
		return score;
	} else {
		return -score;
	}	
}